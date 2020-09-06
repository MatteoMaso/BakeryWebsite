# Analisi del dominio

1. Analisi del dominio e implementare la soluzione software. La pasticceria vende dolci che hanno un nome ed un prezzo. Ogni dolce è composto da una lista di ingredienti. Opzionale: indicare di ogni ingrediente quantità e unità di misura. Opzionale: La gestione della pasticceria è in mano a Luana e Maria che vogliono avere il proprio account per poter accedere all'area di backoffice tramite email e password. Nell’area di backoffice si possono gestire (CRUD) i dolci e metterli in vendita con una certa disponibilità (esempio: 3 torte paradiso in vendita). I dolci in vendita invecchiano ed in base al tempo trascorso dalla loro messa in vendita hanno prezzi diversi: primo giorno prezzo pieno, secondo giorno costano l’80%, il terzo giorno il 20%. Il quarto giorno non sono commestibili e devono essere ritirati dalla vendita. Realizzare una pagina vetrina dove tutti possono vedere la lista di dolci disponibili e il prezzo relativo. Opzionale: andando nella pagina del dettaglio del dolce (o tramite overlayer), si scoprono gli ingredienti indicati dalla ricetta.

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
![client view][\https://github.com/MatteoMaso/BakeryWebsite/tree/master/doc/ClientView.PNG]

### Admin

- Gli admin hanno la possibilita' di creare un nuovo tipo di torta scegliendo il nome e creando una lista di ingredienti, ingrediente/peso.
- Creare dei lotto di produzione, viene scelto il tipo di torta, il numero di elementi disponibili e il prezzo.
- Possono eliminare i lotti di produzione (vengono segnaliti i blocchi vecchi = > 3gg dalla messa in vendita).

![admin view][\https://github.com/MatteoMaso/BakeryWebsite/tree/master/doc/adminView.PNG]

## Requisiti

L'applicazione deve essere web-based.
- 2 operatori admin
- 100/1000 torte prodotte giornalmente
- ~100 tipi di torte
- ~1000 ingredienti
- < 10K clienti giornalieri
- db size ~2gb

Non vi sono particolari esigenze di performance.
