/**
 * 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间。
 * 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
    输出：[[1,6],[8,10],[15,18]]
    解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

 * @param intervals
 * @returns {[]}
 *
 *
 *
 */


var merge = function ( intervals ) {
  let operator  = intervals
  // 先快速排序，按照区间左边值排序；
  operator.sort((a,b)=>{
    return a[0] - b[0];
  });

  let result = [];
  let current_compaier = operator[0]
  for( let i = 1 ; i<  operator.length ; i++ ){
    let item = operator[i];
    // 区间不重合
    if(current_compaier[1]<item[0]){
       result.push(current_compaier);
       current_compaier =  item ;
    }else{
       // 区间重合时；
       if( current_compaier[1] < item[1]){

          current_compaier[1] = item[1];
       }
    }
  }
  result.push(current_compaier)
  return result;

};

/***
 *  快速排序的实现；
 * @constructor
 */


function QsortRec( list, l , r ) {

  if( l > r) return ;


  // 两个循环的下标点；
  let left = l , right =  r;
  console.log(left,right)

  provid = list[right];   // 基准数；

  while (left < right ){
    while ( left < right && list[ left ] < provid){
      left ++;
    }
    list[ right ]  = list[left];






  }


}

function Qsort( array ) {

 QsortRec(array,0,array.length-1)

  return array;

}




console.log( Qsort([5, 1, 4, 2, 9]) );














//








