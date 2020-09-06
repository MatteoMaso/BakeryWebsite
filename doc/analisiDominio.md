# Analisi del dominio

## Contesto

L'applicazione deve girare all'interno di una pasticceria di piccole dimensioni. 2-operatrici admin e una pagina clienti.

## Struttura

L'applicazione offre una vetrina prodotto visitabile dai clienti.
Un backend accessibile dal personale autorizzato tramite username e password per gestire i prodotti messi in vendita.

I prodotti gestiti sono torte, queste torte sono di tipi diversi i quali possono essere creati dal personale.
In vendita vengono esposti lotti di torte, x torte di tipo y al prezzo z.

**Lotto produzione torte**
- x: numero di torte create, disponibili alla vendita
- y: tipo di torta ( tipi sono finiti e vengono creati separatamente)
- z: prezzo 

**Tipi di torta**
I tipi di torta sono finiti e sono formati nel seguente modo:
- nome:
- lista ingredienti[ingrediente, quantita']

**Ingredienti** e' una lista di elementi finiti caricata nel database.
- nome
- unita' di misura


### Vetrina

Lista prodotti disponibili in vendita.
Prodotto:
- nome
- prezzo
- numero di pezzi disponibili
- Lista ingredienti ( a comparsa )

I prezzi dei prodotti vengono calcolati nel seguente modo:
- prodotti il giorno stesso = 100% prezzo vendita
- prodotti 1 gg prima = 80% prezzo vendita
- prodotti 2 gg prima = 20% prezzo vendita
- prodotti >2 gg prima = NON VENDIBILI
- 
![client view][https://github.com/MatteoMaso/BakeryWebsite/tree/master/doc/ClientView.PNG]

### Admin

- Gli admin hanno la possibilita' di creare un nuovo tipo di torta scegliendo il nome e creando una lista di ingredienti, ingrediente/peso.
- Creare dei lotto di produzione, viene scelto il tipo di torta, il numero di elementi disponibili e il prezzo.
- Possono eliminare i lotti di produzione (vengono segnaliti i blocchi vecchi = > 3gg dalla messa in vendita).

![admin view][https://github.com/MatteoMaso/BakeryWebsite/tree/master/doc/adminView.PNG]

## Requisiti

L'applicazione deve essere web-based.
- 2 operatori admin
- 100/1000 torte prodotte giornalmente
- ~100 tipi di torte
- ~1000 ingredienti
- < 10K clienti giornalieri
- db size ~2gb

Non vi sono particolari esigenze di performance.
