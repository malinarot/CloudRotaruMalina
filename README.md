# Experiența mijloacelor de transport în comun




## Introducere

 
SISTEMELE DE TRANSPORT ŞI CARACTERISTICILE ACESTORA
  Sistemele de transport pot fi definite ca totalitatea mijloacelor şi instalaţiilor întrebuinţate în vederea înlaturăriiii distanţelor.
În compunerea şi organizarea transporturilor intră elemente de ordin tehnic:
•drumul;
•mijlocul de transport;
•forţa de muncă a mijlocului de transport.

Transporturile se pot clasifica astfel:
Din punctul de vedere al obiectului transportului'
1
transport de călători şi
2.
transport de mărfuri.
  Transportul in comun este un serviciu public de transport, în număr mare, disponibil pentru întreaga populație, distinctă de sistemul de taximetru, închiriere de autobuze și autocare de către persoane care nu se cunosc și nu au încheiat un contract de prestare servicii cu o companie de transport.

Transportul public de persoane include transportul cu ajutorul mijloacelor de transport de mare capacitate ca: autobuz, troleibuz, tramvai, tren, metrou, avion, feribot-uri, etc. Transportul în cadrul localităților se face în principal cu ajutorul autobuzelor și tramvaielor în timp ce transportul între localități se realizează cu ajutorul autocarelor, avioanelor și trenurilor.
Transportul rutier
Autobuze
Transportul se face cu ajutorul mai multor tipuri de autobuz:

Autobuze urbane - sunt lipsite de un compartiment special amenajat pentru bagaje, iar numarul de locuri pe scaune este mic
Autobuze turistice - asigură un confort ridicat călătoriei: aer condiționat, bar, sistem audio-video; poate transporta până la 50 de turiști
Mini-autobuze
Sunt autobuze echipate cu motoare electrice alimentate prin două trolee (tije metalice) de la o linie formată din două fire electrice aeriene, montate la 4 m înălțime, deasupra carosabilului. Troleibuzele sunt mijloace de transport in comun ecologice, pentru ca nu elimina noxe, iar poluarea fonică este redusă.
Transportul feroviar
Tren
Este un mijloc de transport ce folosește calea ferată dedicată drept cale de transport. Un tren este format de regulă din cel puțin o locomotivă și un număr variabil de vagoane. Locomotivele moderne funcționează cu propulsie diesel sau alimentate cu energie electrică de la un cablu aerian de curent (catenară), printr-un pantograf. Vagoanele de călători sunt clasificate în funcție de confortul oferit în vagoane. Vagoanele de călători au instalații de încălzire, iluminat, ventilație, etc.

Tramvai
Este un mijloc de transport folosit de regulă doar în orașe, iar calea ferată dedicată pe care se deplasează este amplasată pe mijlocul străzilor, separată sau nu de benzile de circulație, ori pe cale dedicată. Deplasarea tramvaiului se face cu ajutorul motoarelor electrice, alimentele cu energie electrică prin intermediul unui pantograf, de la un cablu electric aerian. Tramvaiul este compus din unul sau mai multe vagoane, de regulă legate prin burdufuri mobile.

Metrou
Este o rețea feroviară ce funcționează doar în anumite orașe cu populație semnificativă. Transportul se face prin trenuri electrice de mare viteză, ce se deplasează prin tuneluri subterane sau parțial sub ori supraterane, având propriile căi de transport, sisteme de control și semnalizare. Trenul de metrou este condus de conductori umani; perfecționarea tehnologiilor din domeniul automatizărilor, a adus în unele rețele de metrou, la înlocuirea completă a omului de la conducerea trenului. În România, există o singură rețea de metrou, care funcționează în București, din anul 1975.

    Aplicația creată vine în interesul tuturor celor ce utilizează mijloacele de transport în comun. Partea de implementare a aplicației presupune proiectarea atât pentru partea de Front End, Back End, baze de date. Limbajele de programare folosite, cât și framework-urile folosite sunt: Nodejs, Express, Vue, Quasar, Postgresql, Heroku, Vscode, Git)
## Descriere problema

   Tema aleasă presupune astfel evidența în ceea ce privește experiența cu mijloacele de transport în comun. Atât în București, cât și în celelalte orașe, oamenii petrec o bună parte din zi cu naveta. Un studiu recent al Global Congestion Impact, Bucrești ocupă locul 1 ca fiind orașul cu cele mai multe ore petrecute în trafic. 
"București (cu 134 de ore pierdute în trafic), Bogota (133 de ore), New York (100 de ore), Moscova (100 de ore) și Philadelphia (94 de ore) sunt primele 5 orașe cele mai aglomerate, potrivit clasamentul Global Congestion Impact publicat marți de INRIX, cea mai precisă aplicaţie de trafic, dirijare şi alertare rutieră. România a fost inclusă pentru prima oară în acest clasament în 2020, ne-existând date care să arate schimbările față de anii anteriori."(Global Congestion Impact, 09/03/2021) 
  Așadar, prin aplicația cretă, ne propunem sa diminuăm numărul de ore pierdute în trafic, având o evidență constantă a ceea ce se petrece în traficul României.
  

## Descriere API
Interfața de Programare a Aplicației (Application Programming Interface)

  Cu ajutorul aplicației implementate, putem avea date clare asupra traficului si asupra rutelor de transport. Utilizatorii introduc date, acestea fiind stocate în baza de date, urmând a fi puse la dispoziția tuturor celor de dispun de un cont pe platforma noastră.(Contul poate fi creat apăsând butonul REGISTER, în cazul în care acesta există se va apăsa LOGIN) Interfața este una simplistă, dispune de profilul utilizatorului, de unde acesta își poate modifica propriile date de contact și un buton de LOGOUT în partea de sus dreaptă a aplicației.
 Pot fi urmărite experiențele proprii, cât și cele colective, cu posibilitate de editare.
  

## Flux de date
   Fluxurile de date sunt un mod de a genera o sursă de date întreţinută, pe care o puteţi utiliza uşor ca să creaţi în mod eficient vizualizări care au sens.
   
1.Exemple de request/response

POST: /api/experiences

```json
Request body:

{
  "start":"crangasi",
  "end":"romana",
  "transportMean":"Metro",
  "time":"18:51",
  "travelDuration":"40",
  "crowdLevel":90,
  "observation":"ceva",
  "satisfaction":"sentiment_satisfied"
 }

Response body:
{ 
    "message": "Experience was sucessfull created"
}

```

GET: /api/logout

```json
Response body:
{ 
   "message": "Successful logout"
}

```




2.Metode HTTP

| Verb HTTP | Cale                 | Descriere                                   |
| --------- | -------------------- | ------------------------------------------- |
| GET       | /api/reset           | reseteaza baza de date                      |
| POST      | /api/register        | adauga un nou utilizator al aplicatiei      |
| POST      | /api/login           | autentifica utilizator existent             |
| GET       | /api/logout          | dezautentifica utilizator autentificat      |
| PUT       | /api/user            | modifica date utilizator autentificat       |
| DELETE    | /api/user            | sterge utilizator autentificat              |
| GET       | /api/experiences     | reda experiente utilizator autentificat     |
| GET       | /api/experiences/all | reda experiente toti utilizatorii           |
| DELETE    | /api/experiences     | sterge experienta utilizator autentificat   |
| PUT       | /api/experiences     | modifica experienta utilizator autentificat |
| POST      | /api/experiences     | adauga experienta utilizator autentificat   |



### Autentificare si autorizare servicii

Pentru autentificare am folosit sesiuni de client stocate in cookie.

Singurele endpoint-uri ce pot fi folosite fara ca utilizatorul sa fie autentificat sunt **register** si **login**, pentru restul fiind necesar ca utilizator sa fie autentificat. 

## Capturi ecran aplicatie

![printscreen](Capture.PNG)
![image](https://user-images.githubusercontent.com/59361936/117701101-81440f80-b1cf-11eb-94a2-6c9a3580071a.png)
![image](https://user-images.githubusercontent.com/59361936/117701525-03cccf00-b1d0-11eb-88c7-09a527077c95.png)
![image](https://user-images.githubusercontent.com/59361936/117701604-1ba45300-b1d0-11eb-8330-e7913a13fd39.png)
![image](https://user-images.githubusercontent.com/59361936/117701646-29f26f00-b1d0-11eb-9a58-5083d11c1a93.png)





## Referinte

https://docs.oracle.com/cloud/help/ro/reportingcs_use/BILUG/GUID-DC0CDEDF-6F36-45BC-BA8F-E2D3196D5D86.htm#BILUG-GUID-DC0CDEDF-6F36-45BC-BA8F-E2D3196D5D86
https://economie.hotnews.ro/stiri-finante_banci-24653836-bucuresti-orasul-traficul-cel-mai-ingrozitor-din-lume-soferii-pierd-anual-134-ore-trafic-raport.htm
https://cloud.google.com/compute/?utm_source=google&utm_medium=cpc&utm_campaign=emea-emea-all-en-dr-skws-all-all-trial-b-gcp-1010042&utm_content=text-ad-none-any-DEV_c-CRE_506516065181-ADGP_Hybrid%20%7C%20SKWS%20-%20BMM%20%7C%20Txt%20~%20Compute%20~%20Compute%20Engine_Cloud%20Computing-KWID_43700062209274210-aud-606988878614%3Akwd-17979492460-userloc_1011795&utm_term=KW_%2Bcloud%20%2Bcomputing-NET_g-PLAC_&gclid=Cj0KCQjws-OEBhCkARIsAPhOkIZVYLP1zdBJiYrAqkRUuCAjRPrPmHsSTX7If04dnLWcwylhEY0_H2IaAt1vEALw_wcB&gclsrc=aw.ds
https://www.heroku.com/
https://www.oracle.com/ro/cloud/what-is-cloud-computing/
