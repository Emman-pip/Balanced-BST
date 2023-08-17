const node = (value, left = null, right = null) => {
  return { value, left, right };
};

const tree = () => {
  const prettyPrint = (node, prefix = "", isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
    if (node.left !== null) {
      prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  };
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
  return { buildTree, prettyPrint };
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
console.log(array.sort((a, b) => a - b));
const balancedBST = tree();
const root = balancedBST.buildTree(array);
balancedBST.prettyPrint(root);
