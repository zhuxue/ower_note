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



function Qsort( array ) {

    let op_array = array;

    Qsort_opc(op_array,0,array.length - 1);

    return op_array;

}

/***
 * array: 要排序的数组，left: 要排序起始点位置， right: 排序终止点位置；
 * @constructor
 */
function Qsort_opc( array, left, right ) {


  if(left >= right ) return ;

  let protem = array[left]; // 设置基准点位置

  let i_left = left ,  i_right = right;

  while (i_left < i_right){
    while (array[i_right] > protem && i_left < i_right){
      i_right--;
    }
    if( i_left < i_right ){
        array[i_left] = array[i_right];
    }

    // 如果不有等于的话，很容易造成死循环；例子 【1，1，1，2，2】； 容易

    while(array[i_left] <=   protem  && i_left < i_right){
      i_left++;
    }
     if( i_left < i_right ){
       array[i_right] = array[i_left];
    }

  }
  array[i_left] = protem;
  Qsort_opc(array,left,i_left-1);
  Qsort_opc(array,i_left+1,right);

}




console.log( Qsort([5, 1, 1, -1, 1]) );














//








