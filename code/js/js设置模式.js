



var calculateBonus = function( performanceLevel, salary ){

  if ( performanceLevel === 'S' ){
    return salary * 4;
  }
  if ( performanceLevel === 'A' ){
    return salary * 3;
  }
  if ( performanceLevel === 'B' ){
      return salary * 2;
  }
};
calculateBonus( 'B', 20000 );





















