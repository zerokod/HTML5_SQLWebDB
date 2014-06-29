// predispongo le variabili

// creo il "name space" delgli oggetti
var chw_2014 = {};
var divIdSegnalazioni = 'segnalazioni';
// predispongo l'oggetto per memorizzare tutto quello che occorre al
// al funzionamento del webSqlDB
chw_2014.webSqlDB = {};

// predispongo la variabile per ospirare il db
chw_2014.webSqlDB.db = null;

// creo la funzione di apertura del db
chw_2014.webSqlDB.open = function() {
	var dbSize = 3 * 1024 * 1024;
	// voglio un db di 3 MB
	// apro effettivamente il db
	chw_2014.webSqlDB.db = openDatabase('diarioCarburante', '1.0', 'diario dei consumu', dbSize);
	if (chw_2014.webSqlDB.db) {
		log('i', 'db successfully open', divIdSegnalazioni);
	} else {
		log('e', 'db NOT open, maybe it is not supported', divIdSegnalazioni);
	}
};

// mi creo le funzioi di segnalazione di successo ed insuccesso
chw_2014.webSqlDB.onSuccess = function(tx, e) {
	log('i', 'that\'s ok ', divIdSegnalazioni);
};

chw_2014.webSqlDB.onError = function(tx, e) {
	log('i', 'there is an error ' + e, divIdSegnalazioni);
};

// preparo la funzione di creazione del db
chw_2014.webSqlDB.createTableBenzinai = function() {
	chw_2014.webSqlDB.db.transaction(function(tx) {
		tx.executeSql('CREATE TABLE IF NOT EXISTS' + ' benzinaio (id INTEGER PRIMARY KEY,' + ' marca	TEXT,' + ' posizione TEXT,' + ' indirizzo TEXT,' + ' data_creazione DATATIME )', []);
	});
	log('i', 'table created', divIdSegnalazioni);
};

chw_2014.webSqlDB.addBenzinaio = function(singleBenzinaio) {
	chw_2014.webSqlDB.db.transaction(function(tx) {
		var dataScritturaSuDb = new Date();
		var sql = 'INSERT INTO benzinaio (marca, posizione, indirizzo, data_creazione) ';
		sql += ' values (?,?,?,?); ';
		tx.executeSql(sql, [singleBenzinaio.marca, singleBenzinaio.posizione, 
			singleBenzinaio.indirizzo, dataScritturaSuDb], 
			chw_2014.webSqlDB.onSuccess, 
			chw_2014.webSqlDB.onError);
	});
};

// definizioni funzioni utili
function init() {
	chw_2014.webSqlDB.open();
	chw_2014.webSqlDB.createTableBenzinai();

	// creo una variabile fittizzia di prova
	var sb = {};
	sb.marca = 'shell';
	sb.indirizzo = 'A4 km 300';
	sb.posizione = '21321,0;321312,0';
	chw_2014.webSqlDB.addBenzinaio(sb);
	
	// creo piÃ¹ variabili fittizzie di prova
	for (var i = 0; i < 10; i++ ){
		fakeSb = sb; 
		fakeSb.marca+='_'+i;
		fakeSb.indirizzo+='_'+i;
		fakeSb.posizione+='_'+i;
		chw_2014.webSqlDB.addBenzinaio(fakeSb);
	}
}


// avvio delle script
window.onload = init; 