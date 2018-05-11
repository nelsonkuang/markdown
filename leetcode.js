// https://leetcode.com/problems/median-of-two-sorted-arrays
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
    var m = nums1.length,
        n = nums2.length;
    // edge handlers
    if(m === 0){ 
        if(n === 0){
            return null;
        }else if(n === 1){
            return nums2[0];
        } else if(n > 1){
            return (nums2[0] + nums2[n - 1] / 2).toFixed(1, 10);
        }
    }
    if(n === 0){
        if(m === 0){
            return null;
        }else if(m === 1){
            return nums1[0];
        } else if(m > 1){
            return (nums1[0] + nums1[m - 1] / 2).toFixed(1, 10);
        }        
    }
    // other handlers
    return ((nums1[0] + nums1[m - 1] + nums2[0] + nums2[n - 1]) / 4).toFixed(1, 10);
};
// arrayFlatten
function arrayFlatten(arr) {
	if(Object.prototype.toString.call(arr)!=='[object Array]'){
		return [arr];
	}else if(arr.length < 1) {
		return [];
    }else {
	    return [].concat(arrayFlatten(arr[0]), arrayFlatten(arr.slice(1)));
    }
}
