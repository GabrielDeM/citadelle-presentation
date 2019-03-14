export const translateBuildingName = buildingName => {
  switch (buildingName.toLowerCase()) {
    case 'headquarter':
      return 'Quartier Général';
    case 'oilplateform':
      return 'Plateforme pétrolière';
    case 'ammofactory':
      return 'Usine de munition';
    case 'hydroponicfarm':
      return 'Ferme hydroponique';
    case 'ironmine':
      return 'Mine de fer';
    case 'warehouse':
      return 'Entrepôt';
    case 'barrack':
      return 'Caserne';

    default: return buildingName;
  }
}

export const resumeBuildings = buildingName => {
  switch (buildingName) {
    case 'headquarter':
      return 'A partir du Quartier général de la citadelle, vous pouvez améliorer son niveau. En augmentant le niveau du quartier général, vous accélèrerez les travaux des autres bâtiments.';
    case 'oilPlateform':
      return 'Bâtiments de production du pétrole. La quantité de pétrole que vous produisez dépend du niveau de ce bâtiment.';
    case 'ammoFactory':
      return 'Bâtiments de production des munitions. La quantité de munitions que vous produisez dépend du niveau de ce bâtiment.';
    case 'hydroponicFarm':
      return 'La ferme hydroponique défini la limite de population de la citadelle. En augmentant son niveau, cette limite est augmenté.';
    case 'ironMine':
      return 'Bâtiments de production du fer. La quantité de fer que vous produisez dépend du niveau de ce bâtiment.';
    case 'warehouse':
      return 'L\'entrepôt défini la limite des ressources de la citadelle. En augmentant son niveau, cette limite est augmenté.';
    case 'barrack':
      return 'La Caserne est le bâtiment où est recrutée l\'infanterie. Plus son niveau est élevé, plus les recrutements sont rapides.';

    default: return buildingName;
  }
}
