// Fonction de réinitialisation
const resetAll = () => {
    location.reload();
  };
  
  // Fonction pour basculer la visibilité d'un élément
  const toggleElementVisibility = (element, isVisible) => {
    element.style.display = isVisible ? 'block' : 'none';
  };
  
  // Fonction pour mettre à jour l'état de l'icône de validation
  const updateValidationIcons = () => {
    const tailleInput = document.getElementById('height');
    const poidsInput = document.getElementById('weight');
    const tailleIcon = document.getElementById('tailleIcon');
    const poidsIcon = document.getElementById('poidsIcon');
  
    tailleIcon.classList.remove('valid', 'invalid');
    poidsIcon.classList.remove('valid', 'invalid');
  
    if (tailleInput.value.trim() === '' || isNaN(parseFloat(tailleInput.value)) || parseFloat(tailleInput.value) === 0) {
      tailleIcon.classList.add('invalid');
    } else {
      tailleIcon.classList.add('valid');
    }
  
    if (poidsInput.value.trim() === '' || isNaN(parseFloat(poidsInput.value)) || parseFloat(poidsInput.value) === 0) {
      poidsIcon.classList.add('invalid');
    } else {
      poidsIcon.classList.add('valid');
    }
  };
  
  // Fonction pour réinitialiser l'état des icônes de validation
  const resetValidationIcons = () => {
    const tailleIcon = document.getElementById('tailleIcon');
    const poidsIcon = document.getElementById('poidsIcon');
  
    tailleIcon.classList.remove('valid', 'invalid');
    poidsIcon.classList.remove('valid', 'invalid');
  };
  
  // Déclaration des variables globales
  const tailleInput = document.getElementById('height');
  const poidsInput = document.getElementById('weight');
  const tailleLabel = document.querySelector('.taille .label');
  const poidsLabel = document.querySelector('.poids .label');
  const button = document.getElementById('button');
  
  // Fonction pour masquer les éléments après le calcul de l'IMC
  const hideElementsAfterCalculation = () => {
    toggleElementVisibility(tailleInput, false);
    toggleElementVisibility(poidsInput, false);
    toggleElementVisibility(tailleLabel, false);
    toggleElementVisibility(poidsLabel, false);
    toggleElementVisibility(button, false);
  };
  
  // Fonction de calcul de l'IMC
  const calculateIMC = () => {
    const resultatText = document.getElementById('nombre');
    const texteClassification = document.getElementById('text');
    const resnombre = document.getElementById('resnombre');
    const restext = document.getElementById('restext');
    const reset = document.getElementById('reset');
    const resetIconElement = document.getElementById('img');
    const tailleIcon = document.getElementById('tailleIcon');
    const poidsIcon = document.getElementById('poidsIcon');
    const rappelElement = document.querySelector('.rappel');
    const iconPlus = document.querySelector('.plus');
  
    const taille = parseFloat(tailleInput.value) / 100; // Convertir en mètres
    const poids = parseFloat(poidsInput.value);
  
    // Récupérer les valeurs de taille et de poids
    const taille_init = tailleInput.value;
    const poids_init = poidsInput.value;
  
    // Mettre à jour le texte de rappel avec les valeurs saisies par l'utilisateur
    const rappelTailleElement = document.querySelector('.rappel_taille');
    rappelTailleElement.textContent = `${taille_init}cm`;
  
    const rappelPoidsElement = document.querySelector('.rappel_poids');
    rappelPoidsElement.textContent = `${poids_init}kg`;
  
    resetValidationIcons(); // Réinitialiser l'état des icônes de validation
  
    updateValidationIcons();
  
    if (isNaN(taille) || isNaN(poids) || taille === 0 || poids === 0) {
      return;
    }
  
    const imc = poids / (taille * taille);
    const imcRounded = imc.toFixed(1);
  
    resultatText.textContent = imcRounded;
    texteClassification.textContent = getIMCClassification(imc);
  
    toggleElementVisibility(resetIconElement, true);
    hideElementsAfterCalculation(); // Masquer les éléments après le calcul de l'IMC
    toggleElementVisibility(resnombre, true);
    toggleElementVisibility(restext, true);
    toggleElementVisibility(reset, true);
    toggleElementVisibility(tailleIcon, false);
    toggleElementVisibility(poidsIcon, false);
    
    rappelElement.style.display = 'flex';
    iconPlus.style.display = 'flex';
  
    // Ajout de la fonctionnalité de rafraîchissement avec la touche Entrée
    document.addEventListener('keydown', (event) => {
      if (event.keyCode === 13) {
        const resnombre = document.getElementById('resnombre');
        const reset = document.getElementById('reset');
  
        if (resnombre.style.display !== 'none' && reset.style.display !== 'none') {
          resetAll();
        }
      }
    });
  };
  
  const imcClassifications = [
    {
      threshold: 18.5,
      label: 'Maigreur morbide',
    },
    {
      threshold: 25,
      label: 'Corpulence normale',
    },
    {
      threshold: 30,
      label: 'Surpoids',
    },
    {
      threshold: 35,
      label: 'Obésité modérée',
    },
    {
      threshold: 40,
      label: 'Obésité sévère',
    },
  ];
  
  const getIMCClassification = (imc) => {
    let classification = 'Obésité morbide';
  
    for (const classificationObj of imcClassifications) {
      if (imc < classificationObj.threshold) {
        classification = classificationObj.label;
        break;
      }
    }
  
    return classification;
  };
  
  // Récupérer l'élément de l'image "plus" par son identifiant
  const plusImage = document.getElementById('plusImage');
  
  // Fonction à effectuer lorsque l'image est cliquée
  const handleClickOnPlus = () => {
    const rectangle1 = document.getElementById('rectangle1');
    const rectangle2 = document.getElementById('rectangle2');
    const titre2 = document.getElementById('titre2');
    const info1 = document.getElementById('info1');
    const info2 = document.getElementById('info2');
    const resultatImc = document.getElementById('nombre').textContent;
    const plusImage = document.getElementById('plusImage');
    const moinsImage = document.getElementById('moinsImage');
  
    fontSize = getComputedStyle(titre2, null).fontSize;
  
    if (fontSize == '30px') {
      //rectangle1.style.marginTop = '-350px';
      rectangle1.style.transition = 'top 1s, transform 1s';
      rectangle1.style.transform = 'translateY(-35%)';
      rectangle2.style.transition = 'bottom 1s, transform 1s';
      rectangle2.style.transform = 'translateY(35%)';
    }else {
      //rectangle1.style.marginTop = '-250px';
      rectangle1.style.transition = 'top 1s, transform 1s';
      rectangle1.style.transform = 'translateY(-35%)';
      rectangle2.style.transition = 'bottom 1s, transform 1s';
      rectangle2.style.transform = 'translateY(40%)';
    }
    
    rectangle2.style.display = 'flex';
    plusImage.style.display = 'none';
    moinsImage.style.display = 'flex';
    
    if (resultatImc < 18.5) {
      titre2.textContent = `IMC INFÉRIEUR À 18.5`;
      info1.textContent = `D’APRÈS L’ÉCHELLE DE L’OMS, VOUS ÊTES EN INSUFFISANCE PONDÉRALE`;
      info2.textContent = `IMC inférieur à 18,5 : Indique une insuffisance pondérale, pouvant être associée à un risque de dénutrition et de problèmes de santé liés à la maigreur. Une prise en charge médicale et nutritionnelle peut être nécessaire pour atteindre un poids santé.`;
    }else if (resultatImc >= 18.5 && resultatImc < 25) {
      titre2.textContent = `IMC COMPRIS ENTRE 18,5 ET 25`;
      info1.textContent = `D’APRÈS L’ÉCHELLE DE L’OMS, VOUS ÊTES DE CORPULENCE NORMALE`;
      info2.textContent = `IMC entre 18,5 et 24,9 : Correspond à une plage de poids considérée comme normale. Cette catégorie est associée à un risque moindre de maladies chroniques, comme les maladies cardiovasculaires ou le diabète.`;
    }else if (resultatImc >= 25 && resultatImc < 30) {
      titre2.textContent = `IMC COMPRIS ENTRE 25 ET 30`;
      info1.textContent = `D’APRÈS L’ÉCHELLE DE L’OMS, VOUS ÊTES EN SURPOIDS`;
      info2.textContent = `IMC entre 25 et 29,9 : Indique un surpoids. Cette condition peut augmenter les risques de problèmes de santé tels que l'hypertension, le diabète de type 2 et les maladies cardiaques. Une approche de perte de poids par le biais d'une alimentation équilibrée et de l'exercice peut être recommandée.`;
    }else if (resultatImc >= 30 && resultatImc < 35) {
      titre2.textContent = `IMC COMPRIS ENTRE 30 ET 35`;
      info1.textContent = `D’APRÈS L’ÉCHELLE DE L’OMS, VOUS ÊTES EN OBÉSITÉ MODÉRÉE`;
      info2.textContent = `IMC entre 30 et 34,9 : Correspond à une obésité de classe I. Les risques de maladies cardiovasculaires, de diabète de type 2 et d'autres problèmes de santé sont accrus. Une gestion médicale et diététique est recommandée pour améliorer la santé.`;
    }else if (resultatImc >= 35 && resultatImc < 40) {
      titre2.textContent = `IMC COMPRIS ENTRE 35 ET 40`;
      info1.textContent = `D’APRÈS L’ÉCHELLE DE L’OMS, VOUS ÊTES EN OBÉSITÉ SÉVÈRE`;
      info2.textContent = `IMC entre 35 et 39,9 : Indique une obésité de classe II, considérée comme sévère. Les risques de maladies cardiovasculaires, de diabète de type 2 et d'autres problèmes de santé sont significativement accrus. Une prise en charge médicale, diététique et un suivi régulier sont essentiels pour améliorer la santé.`;
    }else{
      titre2.textContent = `IMC SUPERIEUR à 40`;
      info1.textContent = `D’APRÈS L’ÉCHELLE DE L’OMS, VOUS ÊTES EN OBÉSITÉ MORBIDE OU MASSIVE`;
      info2.textContent = `IMC supérieur à 40 : Correspond à une obésité de classe III, également appelée obésité morbide. Les risques de maladies cardiovasculaires, de diabète de type 2, d'apnée du sommeil et d'autres problèmes de santé graves sont très élevés. Une prise en charge médicale approfondie, qui peut inclure la chirurgie bariatrique, est souvent nécessaire pour réduire ces risques et améliorer la qualité de vie.`;
    }
  };
  
  const handleClickOnMinus = () => {
    //rectangle1.style.marginTop = '0px';
    //rectangle2.style.display = 'none';
    plusImage.style.display = 'flex';
    moinsImage.style.display = 'none';
    rectangle1.style.transform = 'translateY(0%)';
    rectangle2.style.transform = 'translateY(0%)';
  };
  
  plusImage.addEventListener('click', handleClickOnPlus);
  moinsImage.addEventListener('click', handleClickOnMinus);
  
  // Ajout des gestionnaires d'événements
  const resetIconElement = document.getElementById('img');
  resetIconElement.addEventListener('click', resetAll);
  
  button.addEventListener('click', calculateIMC);