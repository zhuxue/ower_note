/***
 * 给定一个整数数组 nums ，找到一个具有最大和的连续子数组（子数组最少包含一个元素），返回其最大和。
    输入：nums = [-2,1,-3,4,-1,2,1,-5,4]
    输出：6
    解释：连续子数组 [4,-1,2,1] 的和最大，为 6 。
 * @param nums
 * @returns {*}
 */


var maxSubArray = function(nums) {


    if(nums.length === 0) return 0 ;
    let current_max = nums[0];// 当前连续的和

    let max_num = nums[0]; // 当前连续最大值；

    for(let i = 1 ; i < nums.length; i++ ) {
        if( nums[i]+current_max >= nums[i] ) {
            current_max = nums[i]+current_max;
            if(max_num < current_max){
              max_num = current_max;
            }
        }else{
            current_max =  nums[i];
            if( max_num < nums[i] ){
              max_num = nums[i];
            }
        }
    }
    return max_num;

};


function Status(l, r, m, i) {
    this.lSum = l;   // 当前区间的以左端为起点最大值；
    this.rSum = r;   // 当前区间已有端点为起点，最大值
    this.mSum = m;   // 当前区间最大值；
    this.iSum = i;   // 当前区间的总和
}

const pushUp = (l, r) => {
    const iSum = l.iSum + r.iSum;
    const lSum = Math.max(l.lSum, l.iSum + r.lSum);
    const rSum = Math.max(r.rSum, r.iSum + l.rSum);
    const mSum = Math.max(Math.max(l.mSum, r.mSum), l.rSum + r.lSum);   // 可能在做区间，也可能在有区间

    return new Status(lSum, rSum, mSum, iSum);
}

const getInfo = (a, l, r) => {
    if (l === r) {
        return new Status(a[l], a[l], a[l], a[l]);
    }
    const m = (l + r) >> 1;
    const lSub = getInfo(a, l, m);
    const rSub = getInfo(a, m + 1, r);


    return pushUp(lSub, rSub);
}
// 分治法求最大子序和；

var maxSubArray_1 = function(nums) {
    return   getInfo(nums, 0, nums.length - 1).mSum;
};




//


















// console.log(maxSubArray([-100000]))




function maxProfit(price) {
    const day_dp = [{
        day_sale_op:0,
        day_buy_op:-price[0],
        day_no_op:0,

    }];

    for(var i = 1 ; i < price.length; i++ ){

        day_dp.push({});
        day_dp[i].day_sale_op = Math.max(day_dp[i-1].day_sale_op , day_dp[i-1].day_buy_op + price[i])
        day_dp[i].day_buy_op = Math.max(day_dp[i-1].day_buy_op , day_dp[i-1].day_sale_op - price[i]);
        day_dp[i].day_no_op = Math.max(day_dp[i].day_buy_op , day_dp[i].day_sale_op );

    }

    console.log(day_dp);

}

maxProfit([7,1,5,3,6,4])

