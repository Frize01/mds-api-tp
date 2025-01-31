function dab({ somme, devise }) {
  if (typeof somme !== "number" || typeof devise !== "string") {
    throw new Error("Paramètres invalides");
  }

  const devisesConfig = {
    "€": {
      coupures: [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
      getType: (valeur) => (valeur >= 5 ? "billet(s)" : "pièce(s)"),
    },
    "$": {
      coupures: [100, 50, 20, 10, 5, 2, 1, 0.5, 0.25, 0.1, 0.05, 0.01],
      getType: (valeur) => (valeur > 1 ? "dollard(s)" : "cent(s)"),
    },
    "£": {
      coupures: [50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05, 0.02, 0.01],
      getType: (valeur) => (valeur >= 5 ? "pound(s)" : "penny/pence"),
    },
    "¥": {
      coupures: [10000, 5000, 2000, 1000, 500, 100, 50, 10, 5, 1],
      getType: (valeur) => (valeur >= 1000 ? "billet(s)" : "pièce(s)"),
    },
    "CHF": {
      coupures: [1000, 200, 100, 50, 20, 10, 5, 2, 1, 0.5, 0.2, 0.1, 0.05],
      getType: (valeur) => (valeur >= 10 ? "billet(s)" : "pièce(s)"),
    },
  };

  if (!devisesConfig.hasOwnProperty(devise)) {
    throw new Error("Devise non supportée");
  }

  let reste = somme;
  let resultat = new Array();
  const config = devisesConfig[devise];

  config.coupures.forEach((coupure) => {
    const nombre = Math.floor(reste / coupure);
    if (nombre > 0) {
      resultat.push({
        valeur: coupure,
        nombre: nombre,
        type: config.getType(coupure),
      });
      reste = reste % coupure;
    }
  });

  return resultat;
}

module.exports = dab;
