const node = (value, left = null, right = null) => {
  return { value, left, right };
};

const tree = () => {
  const formatArray = (array) => {
    const newArray = [];
    for (let i = 0; i < array.length; i++) {
      if (newArray.includes(array[i])) continue;
      newArray.push(array[i]);
    }
    return newArray.sort((a, b) => a - b);
  };
  const buildTree = (array) => {
    // TODO: don't let already existing values repeat
    const sortedArray = formatArray(array);
    // if (array.length ===0) return;
    if (sortedArray[0] === undefined) {
      return null;
    }
    const mid = Math.floor((0 + sortedArray.length) / 2);
    const target = sortedArray[mid];
    const root = node(target);

    const leftHalf = sortedArray.splice(0, mid);
    const rightHalf = sortedArray.splice(1, sortedArray.length - 1);
    //this
    // if (root.left === target || root.right === target || root.value === target){

    // }
    // console.log(rightHalf, mid);

    root.left = buildTree(leftHalf);
    root.right = buildTree(rightHalf);

    // console.log("root", root);
    return root;
  };
  return { buildTree };
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(array.sort((a, b) => a - b));
const balancedBST = tree();
console.log("outside", balancedBST.buildTree(array));
