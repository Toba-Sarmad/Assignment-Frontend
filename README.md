Mataffär-app

Ett frontend projekt som handlar om en mataffär app byggd på två HTML filer, CSS och Javascript filer. Appen hämtar produktdata från OpenFoodFacts, och låter användaren söka filtrera på kategorier och lägga produkter i en kundvagn som sparas i localStorage.
Beskrivning
Appen visar delar produkter i kategorier: snacks, mjölk och mejeri, bröd, med namn, pris och en bild på produkten. Den finns en funktion “Lägg i kundvagn” för att kunna lägga till produkter in i kundvagnen. Kundvagnen visas som en popup högst upp i headern, och sparas i webbläsarens localStorage, detta gör att varorna finns kvar vid omladdning.

OpenFoodFacts är en API, vilket gör det möjligt för kunden att se produkterna i kategorier. Det finns en sökruta för att filtrera synliga produkter per kategori. Vid klick anropas respective API-endpoint och första 20 relevanta produkter visas. Kundvagnen visas som ett popup-fält när man hovrar musen över kundvagn ikonen. Popup Menyn visar produktens namn, pris, totalsumma och en gå till kassan knapp. Kunden kan även ta bort produkter direkt i popupen. Det finns en lokal lagring av kundvagn (localStorage). Det finns en annan html-sida dedikerad för kassan (checkout.html) som visar orderns innehåll,  totalsumma, en knapp för att slutföra beställningen och en tillbaka knapp till startsidan. När köpet har genomförts får kunden en bekräftelse som “Tack för ditt köp”, samtidigt så töms kundvagnen och kunden skickas tillbaka till butikssidan.

Filstruktur:
Index.html startsida med produktlista, sökfunktion och kundvagn
Checkout.html är kassasidan där man slutför beställningen
Style.css för designen av hemsidan
scriptjs - är kundens logik dvs funktionalitet för API- hämtning, render, kundvagn och favoriter

Favoriter
Alla produktkort har en “lägg till kanpp” men även en hjärta bredvid knappen. På så sätt kan kunden märka sina favoritprodukter. Sedan dyker en popup vid hörnet när man lägger till en produkt som favorit och när den tas bort. Favoriterna sparas i localStorage. 

Teknisk beskrivning
I script.js filen hämtas produkterna med hjälp av “fetch”:
fetch("https://world.openfoodfacts.org/api/v2/search?..."). Resultatet presenteras sedan i en grid layout.


Lokal lagring (localStorage)
Kundvagn 
[
  { "id": "12345", "name": "Chips", "price": 29.90 }
]

Favoriter
[
  { "id": "12345", "name": "Chips", "img": "bild.jpg" }
]

Design CSS
En sticky header
Produktgrid
Popup kundvagn
Hjärt animationer för favoriter
Responsive design
Färgerpalleter: rött, vit och grått för att likna en butik känsla
En visuell markering för att visa vilken kategori som är vald, när kunden klickar på en kategori (ex snacks) får den klassen en annan färg och stil, det blir tydligare för kunden vilken kategori som är aktiv vilket förbättrar både navigationen och användarupplevelsen.

Hur projektet körs
Jag har använt mig av Vs code Microsoft. Det finns en funktion i Vs code där man kan trycka på Go Live, då väljer man vilken sökmotor man vill använda. I detta projekt öppnades index.html i Chrome.  

Framtida förbättring
Bättre prislogik för att alla produkter som läggs in i kassan har samma pris, den är statiskt. En egen backend med databas. En inloggningssida för kunden. Om jag har en större projekt i framtiden är det bra med pagination vid API hämtning.
