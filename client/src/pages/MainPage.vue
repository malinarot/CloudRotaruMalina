<template>
  <q-page class>
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>Public transport experiences</q-toolbar-title>
        <q-btn
          color="white"
          text-color="primary"
          label="Profile"
          @click="
            userEdit = false;
            profile = true;
          "
          style="margin-right:50px"
        />
        <q-btn color="white" text-color="black" label="Log out" @click="onLogout" />
      </q-toolbar>
    </q-header>
    <q-tabs
      v-model="tab"
      dense
      align="justify"
      class="bg-grey-2 text-primary shadow-2"
      :breakpoint="0"
    >
      <q-tab name="my" label="My experiences" />
      <q-tab name="all" label="All experiences" />
    </q-tabs>
    <q-tab-panels v-model="tab" animated>
      <q-tab-panel name="my">
        <q-table
          title="My experiences"
          :data="experiences"
          :filter="filter"
          :columns="columns"
          row-key="name"
          style="margin:50px"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-actions="props">
            <q-td :props="props">
              <q-btn
                class="button"
                outline
                style="margin-right:20px"
                @click="editExperience(props.row)"
                round
                color="primary"
                icon="create"
              />
              <q-btn
                class="button"
                outline
                @click="removeExperience(props.row)"
                round
                color="negative"
                icon="delete"
              />
            </q-td>
          </template>
          <template v-slot:body-cell-satisfaction="props">
            <q-td :props="props">
              <q-icon size="lg" :name="props.row.satisfaction" />
            </q-td>
          </template>

          <template v-slot:top-left>
            <q-btn color="primary" label="ADD" outline @click="addExperience" />

            <q-space />
          </template>
        </q-table>
      </q-tab-panel>
      <q-tab-panel name="all">
        <q-table
          title="All experiences"
          :data="allExperiences"
          :filter="filter"
          :columns="columns.filter(item => item.name != 'actions')"
          row-key="name"
          style="margin:50px"
        >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
          <template v-slot:body-cell-satisfaction="props">
            <q-td :props="props">
              <q-icon size="lg" :name="props.row.satisfaction" />
            </q-td>
          </template>
        </q-table>
      </q-tab-panel>
    </q-tab-panels>

    <q-dialog v-model="card" style="width:60%">
      <q-card class="my-card full-width">
        <q-card-section class="row text-h5 ellipsis">
          <div class="col-3 text-grey" v-if="state === 'ADD'">Add experience</div>
          <div class="col-3 text-grey" v-else>Edit experience</div>
        </q-card-section>
        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Departure:</div>
            <q-input
              class="col-9"
              type="text"
              outlined
              v-model="selectedExperience.start"
              dense
              label="Departure"
            />
          </div>

          <div class="row q-mb-md">
            <div class="col-3 text-grey">End:</div>
            <q-input
              class="col-9"
              type="text"
              outlined
              v-model="selectedExperience.end"
              dense
              label="End"
            />
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Crowd level: {{ selectedExperience.crowdLevel }}%</div>
            <div class="col-9">
              <q-slider outlined dense v-model="selectedExperience.crowdLevel" :min="0" :max="100" />
            </div>
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Travel duration:</div>
            <q-input
              class="col-9"
              type="number"
              outlined
              v-model="selectedExperience.travelDuration"
              dense
              label="Duration (minutes)"
            />
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Transport mean:</div>
            <q-select
              class="col-9"
              v-model="selectedExperience.transportMean"
              :options="['Bus', 'Metro', 'Tram']"
              label="Transport mean"
              outlined
              dense
            />
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Observation:</div>
            <q-input
              class="col-9"
              type="text"
              outlined
              v-model="selectedExperience.observation"
              dense
              label="Observation"
            />
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Satisfaction:</div>

            <q-radio v-model="selectedExperience.satisfaction" val="sentiment_very_satisfied">
              <q-icon size="lg" name="sentiment_very_satisfied" />
            </q-radio>
            <q-radio v-model="selectedExperience.satisfaction" val="sentiment_satisfied">
              <q-icon size="lg" name="sentiment_satisfied" />
            </q-radio>
            <q-radio v-model="selectedExperience.satisfaction" val="sentiment_dissatisfied">
              <q-icon size="lg" name="sentiment_dissatisfied" />
            </q-radio>
            <q-radio v-model="selectedExperience.satisfaction" val="sentiment_very_dissatisfied">
              <q-icon size="lg" name="sentiment_very_dissatisfied" />
            </q-radio>
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Time</div>
            <q-input
              label="Time"
              outlined
              dense
              class="col-9"
              v-model="selectedExperience.time"
              mask="time"
              :rules="['time']"
            >
              <template v-slot:append>
                <q-icon name="access_time" class="cursor-pointer">
                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                    <q-time now-btn v-model="selectedExperience.time" />
                  </q-popup-proxy>
                </q-icon>
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions align="around">
            <q-btn
              icon="commute"
              outline
              color="primary"
              @click="executeAddExperience"
              v-if="state === 'ADD'"
            >Add</q-btn>
            <q-btn icon="commute" outline color="primary" v-else @click="executeSaveExperience">Edit</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>

    <q-dialog v-model="profile" style="width:60%">
      <q-card class="my-card full-width">
        <q-card-section class="row text-h5 ellipsis">
          <div class="col-3 text-grey" style="width: 83%;">My profile</div>
          <div class="col-2" align="right">
            <q-btn
              color="primary"
              round
              outline
              icon="create"
              v-if="!userEdit"
              @click="
                userEdit = true;
                isPassword = false;
              "
            />
            <q-btn
              color="primary"
              round
              outline
              v-else
              icon="clear"
              @click="
                userEdit = false;
                isPassword = false;
              "
            />
          </div>
        </q-card-section>
        <q-card-section>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">First name:</div>
            <div class="col-9 text-dark" v-if="!userEdit">{{ user.firstName }}</div>
            <q-input
              v-else
              class="col-9"
              type="text"
              outlined
              v-model="user.firstName"
              dense
              label="First name"
            />
          </div>

          <div class="row q-mb-md">
            <div class="col-3 text-grey">Last name:</div>
            <div class="col-9 text-dark" v-if="!userEdit">{{ user.lastName }}</div>
            <q-input
              v-else
              class="col-9"
              type="text"
              outlined
              v-model="user.lastName"
              dense
              label="Last name"
            />
          </div>
          <div class="row q-mb-md">
            <div class="col-3 text-grey">Email:</div>
            <div class="col-9 text-dark" v-if="!userEdit">{{ user.email }}</div>
            <q-input
              class="col-9"
              type="text"
              v-else
              outlined
              v-model="user.email"
              dense
              label="Email"
            />
          </div>
          <div class="row q-mb-md" v-if="isPassword">
            <div class="col-3 text-grey">Password:</div>

            <q-input
              v-model="password"
              outlined
              label="Password"
              class="col-9"
              dense
              :type="isPwd ? 'password' : 'text'"
            >
              <template v-slot:append>
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer"
                  @click="isPwd = !isPwd"
                />
              </template>
            </q-input>
          </div>
        </q-card-section>
        <q-card-section>
          <q-card-actions v-if="userEdit" align="around">
            <q-btn
              outline
              v-if="!isPassword"
              color="primary"
              @click="isPassword = true"
            >Change password</q-btn>
            <q-btn icon="clear" outline color="primary" v-else @click="isPassword = false">Password</q-btn>
            <q-btn icon="save" outline color="primary" @click="executeSaveUser">Save changes</q-btn>
          </q-card-actions>
          <q-card-actions v-else align="around">
            <q-btn outline color="negative" @click="deleteAccount()">Delete account</q-btn>
          </q-card-actions>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<style></style>

<script>
export default {
  name: "LoginPage",
  data() {
    return {
      isPassword: false,
      isPwd: true,
      password: "",
      profile: false,
      user: {},
      userEdit: false,
      state: "VIEW",
      tab: "my",
      filter: "",
      card: false,
      selectedExperience: {},
      columns: [
        {
          name: "start",
          required: true,
          label: "Departure",
          align: "left",
          field: row => row.start,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "end",
          required: true,
          label: "Destination",
          align: "left",
          field: row => row.end,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "crowdLevel",
          required: true,
          label: "Crowd level",
          align: "left",
          field: row => row.crowdLevel,
          format: val => `${val}%`,
          sortable: true
        },
        {
          name: "travelDuration",
          required: true,
          label: "Travel duration",
          align: "left",
          field: row => row.travelDuration,
          format: val => `${val} minutes`,
          sortable: true
        },
        {
          name: "transportMean",
          required: true,
          label: "Transport mean",
          align: "left",
          field: row => row.transportMean,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "satisfaction",
          required: true,
          label: "Satisfaction",
          align: "left",
          field: row => row.satisfaction,
          // format: val => `<q-icon size="lg" name='${val}' />`,
          sortable: true
        },
        {
          name: "time",
          required: true,
          label: "Time",
          align: "left",
          field: row => row.time,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "observation",
          required: true,
          label: "Observations",
          align: "left",
          field: row => row.observation,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: "actions",
          label: "Action"
        }
      ]
    };
  },
  beforeMount() {
    this.user = this.$q.localStorage.getItem("user");
    if (!this.user) {
      this.$router.push("/auth");
    } else {
      this.$store.dispatch("data/loadExperiences");
      this.$store.dispatch("data/loadAllExperiences");
    }
  },
  methods: {
    addExperience() {
      this.state = "ADD";
      this.card = true;
      this.selectedExperience = {
        start: "",
        end: "",
        transportMean: "",
        time: "",
        travelDuration: 0,
        crowdLevel: 50,
        observation: "",
        satisfaction: ""
      };
    },
    editExperience(experience) {
      this.state = "EDIT";
      this.card = true;
      this.selectedExperience = {
        ...experience
      };
    },
    deleteAccount() {
      this.$q
        .dialog({
          title: "Confirmation",
          message: `Are you sure you want to delete your account?`,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete("/api/user")
            .then(response => {
              this.$q.notify({
                color: "green",

                message: response.data.message,
                icon: "arrow_forward"
              });
              this.$q.localStorage.set("user", false);
              this.$router.push("/auth");
            })
            .catch(error => {
              switch (error.response.status) {
                case 400: {
                  error.response.data.errors.forEach(element => {
                    this.$q.notify({
                      color: "negative",
                      message: element
                    });
                  });
                  break;
                }
                default: {
                  this.$q.notify({
                    color: "negative",
                    message: error.response.data.message
                  });
                }
              }
            });
        });
    },
    removeExperience(experience) {
      this.$q
        .dialog({
          title: "Confirmation",
          message: `Do you want to delete ${experience.start} -  ${experience.end} ?`,
          cancel: true,
          persistent: true
        })
        .onOk(() => {
          this.$axios
            .delete("/api/experiences", {
              data: { id: experience.id }
            })
            .then(response => {
              this.$q.notify({
                color: "green",

                message: response.data.message,
                icon: "arrow_forward"
              });
              this.$store.dispatch("data/loadExperiences");
              this.$store.dispatch("data/loadAllExperiences");
            })
            .catch(error => {
              switch (error.response.status) {
                case 400: {
                  error.response.data.errors.forEach(element => {
                    this.$q.notify({
                      color: "negative",
                      message: element
                    });
                  });
                  break;
                }
                default: {
                  this.$q.notify({
                    color: "negative",
                    message: error.response.data.message
                  });
                }
              }
            });
        });
    },
    executeSaveExperience() {
      this.$axios
        .put("/api/experiences", {
          ...this.selectedExperience
        })
        .then(response => {
          this.$q.notify({
            color: "green",

            message: response.data.message,
            icon: "arrow_forward"
          });
          this.$store.dispatch("data/loadExperiences");
          this.$store.dispatch("data/loadAllExperiences");
          this.card = false;
        })
        .catch(error => {
          switch (error.response.status) {
            case 400: {
              error.response.data.errors.forEach(element => {
                this.$q.notify({
                  color: "negative",
                  message: element
                });
              });
              break;
            }
            default: {
              this.$q.notify({
                color: "negative",
                message: error.response.data.message
              });
            }
          }
        });
    },

    executeSaveUser() {
      this.$axios
        .put("/api/user", {
          ...this.user,
          password: this.password,
          changePassword: this.isPassword
        })
        .then(response => {
          this.$q.notify({
            color: "green",

            message: response.data.message,
            icon: "arrow_forward"
          });
          this.$q.localStorage.set("user", response.data.user);
          this.user = response.data.user;
          this.userEdit = false;
          this.isPassword = false;
        })
        .catch(error => {
          switch (error.response.status) {
            case 400: {
              error.response.data.errors.forEach(element => {
                this.$q.notify({
                  color: "negative",
                  message: element
                });
              });
              break;
            }
            default: {
              this.$q.notify({
                color: "negative",
                message: error.response.data.message
              });
            }
          }
        });
    },

    executeAddExperience() {
      this.$axios
        .post("/api/experiences", {
          ...this.selectedExperience
        })
        .then(response => {
          this.$q.notify({
            color: "green",

            message: response.data.message,
            icon: "arrow_forward"
          });
          this.$store.dispatch("data/loadExperiences");
          this.$store.dispatch("data/loadAllExperiences");
          this.card = false;
        })
        .catch(error => {
          switch (error.response.status) {
            case 400: {
              error.response.data.errors.forEach(element => {
                this.$q.notify({
                  color: "negative",
                  message: element
                });
              });
              break;
            }
            default: {
              this.$q.notify({
                color: "negative",
                message: error.response.data.message
              });
            }
          }
        });
    },
    onLogout() {
      this.$axios
        .get("/api/logout")
        .then(response => {
          this.$q.notify({
            color: "primary",
            message: response.data.message
          });

          this.$q.localStorage.set("user", false);
          this.$router.push("/auth");
        })
        .catch(error => {
          this.$q.notify({
            color: "negative",
            message: error.response.data.message
          });
        });
    }
  },
  computed: {
    experiences() {
      return this.$store.getters["data/getExperiences"];
    },
    allExperiences() {
      return this.$store.getters["data/getAllExperiences"];
    }
  }
};
</script>
