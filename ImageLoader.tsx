export const getImageSource = (imageName) => {
  switch (imageName.toLowerCase().replace(/\s/g, '')) {
    case 'apple':
      return require('./icon/apple.png');
    case 'bass':
      return require('./icon/bass.png');
    case 'bellpepper':
      return require('./icon/bellpepper.png');
    case 'brocolli':
      return require('./icon/brocolli.png');
    case 'celery':
      return require('./icon/celery.png');
    case 'cherry':
      return require('./icon/cherry.png');
    case 'chicken':
      return require('./icon/chicken.png');
    case 'chili':
      return require('./icon/chili.png');
    case 'crab':
      return require('./icon/crab.png');
    case 'cucumber':
      return require('./icon/cucumber.png');
    case 'dicebeef':
      return require('./icon/dicebeef.png');
    case 'fruits':
      return require('./icon/fruits.png');
    case 'grapes':
      return require('./icon/grapes.png');
    case 'lambchop':
      return require('./icon/lambchop.png');
    case 'lemon':
      return require('./icon/lemon.png');
    case 'lobster':
      return require('./icon/lobster.png');
    case 'meat':
      return require('./icon/meat.png');
    case 'onion':
      return require('./icon/onion.png');
    case 'orange':
      return require('./icon/orange.png');
    case 'oyster':
      return require('./icon/oyster.png');
    case 'peach':
      return require('./icon/peach.png');
    case 'pear':
      return require('./icon/pear.png');
    case 'plum':
      return require('./icon/plum.png');
    case 'potato':
      return require('./icon/potato.png');
    case 'salami':
      return require('./icon/salami.png');
    case 'salmon':
      return require('./icon/salmon.png');
    case 'sausages':
      return require('./icon/sausages.png');
    case 'seafood':
      return require('./icon/seafood.png');
    case 'shrimp':
      return require('./icon/shrimp.png');
    case 'sirloin':
      return require('./icon/sirloin.png');
    case 'squid':
      return require('./icon/squid.png');
    case 'tomato':
      return require('./icon/tomato.png');
    case 'tuna':
      return require('./icon/tuna.png');
    case 'vegetable':
      return require('./icon/vegetable.png');
    case 'watermelon':
      return require('./icon/watermelon.png');
    default:
      // Provide a default image or handle the case where the image is not found
      return require('./icon/default.png');
  }
};
