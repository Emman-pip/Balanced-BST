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
  const mainRoot = {};
  const buildTree = (array) => {
    const sortedArray = formatArray(array);
    if (sortedArray[0] === undefined) {
      return null;
    }
    const mid = Math.floor((0 + sortedArray.length) / 2);
    const target = sortedArray[mid];
    const root = node(target);

    const leftHalf = sortedArray.splice(0, mid);
    const rightHalf = sortedArray.splice(1, sortedArray.length - 1);

    root.left = buildTree(leftHalf);
    root.right = buildTree(rightHalf);

    mainRoot.root = root;
    return root;
  };
  // FIX NESTING ISSUE HERE
  const insert = (value) => {
    let tree = mainRoot.root;
    while (true) {
      if (value < tree.value) {
        if (tree.left === null) {
          tree.left = node(value);
          break;
        }
        tree = tree.left;
        continue;
      } else if (value > tree.value) {
        if (tree.right === null) {
          tree.right = node(value);
          break;
        }
        tree = tree.right;
        continue;
      } else if (value === tree.value) {
        console.log(`${value} already exists in the BST.`);
        break;
      }
    }
  };
  // TODO: remove function
  // reqs to do the remove function:
  // const removeLogic = (tree, value) => {
  //   // console.log("treevalue", typeof tree.right.value === "number");

  //     // case 2 [nodes with left or right child nodes(one lang)]
  //     // bug here ay walang laman yong tree.right.value sa line 87
  //     // for left
  //     if (
  //       value === tree.left.value &&
  //       tree.left.right === null &&
  //       !tree.left.left === null
  //     ) {
  //       console.log(value);
  //       tree.left = tree.left.left;
  //       break;
  //     } else if (
  //       value === tree.left.value &&
  //       !tree.left.right === null &&
  //       tree.left.left === null
  //     ) {
  //       console.log(value);
  //       tree.left = tree.left.right;
  //       break;
  //     }
  //     //  for right side
  //     else if (
  //       value === tree.right.value &&
  //       tree.right.right === null &&
  //       !tree.right.left === null
  //     ) {
  //       console.log(value);
  //       tree.right = tree.right.left;
  //       break;
  //     } else if (
  //       value === tree.right.value &&
  //       !tree.right.right === null &&
  //       tree.right.left === null
  //     ) {
  //       console.log(value);
  //       tree.right = tree.right.right;
  //       break;
  //     }

  //     // case 1 (lowest part of bst/no child nodes) !!! DONE
  //     // need icheck yong value before last or target then delete yon if sha yong preceding value

  //     if (
  //       !tree.left.value === null &&
  //       value === tree.left.value &&
  //       tree.left.right === null &&
  //       tree.left.left === null
  //     ) {
  //       // console.log(value);
  //       tree.left = null;
  //       break;
  //     } else if (
  //       !tree.right.value === null &&
  //       value === tree.right.value &&
  //       tree.right.right === null &&
  //       tree.right.left === null
  //     ) {
  //       tree.right = null;
  //       break;
  //     }

  //     // loop through condition
  //     if (value < tree.value) {
  //       // console.log(tree.value);
  //       tree = tree.left;
  //       continue;
  //     } else if (value > tree.value) {
  //       // console.log(tree.value);
  //       tree = tree.right;
  //       continue;
  //     } else if (tree.value == null) {
  //       console.log(`no ${value} found`);
  //       return `no ${value} found`;
  //     }
  // };
  const case1 = (value, tree = mainRoot.root) => {
    console.log("case 1");
    console.log(tree);
    while (true) {
      if (
        // !tree.left.value != null &&
        value === tree.left.value &&
        tree.left.right === null &&
        tree.left.left === null
      ) {
        // console.log(value);
        tree.left = null;
        break;
      } else if (
        // !tree.right.value === null &&
        value === tree.right.value &&
        tree.right.right === null &&
        tree.right.left === null
      ) {
        tree.right = null;
        break;
      }

      // loop through condition
      if (value < tree.value) {
        // console.log(tree.value);
        tree = tree.left;
        continue;
      } else if (value > tree.value) {
        // console.log(tree.value);
        tree = tree.right;
        continue;
      } else if (tree.value == null) {
        console.log(`no ${value} found`);
        return `no ${value} found`;
      }
    }
  };
  const case2 = (value, tree = mainRoot.root) => {
    console.log("case 2");
  };
  const case3 = (value, tree = mainRoot.root) => {
    console.log("case 3");
  };

  const caseChecker = (tree, value) => {
    console.log(tree);
    if (tree.right === null && tree.left === null) {
      case1(value);
    } else if (
      (tree.right != null && tree.left === null) ||
      (tree.right === null && tree.left != null)
    ) {
      case2(value);
    } else if (tree.right != null && !tree.left != null) {
      case3(value);
    }
  };

  // make seperate functions for case 1, 2, and 3
  // then check for what is applicable then
  const remove = (value) => {
    let tree = mainRoot.root;
    // tree = removeLogic(tree, value);
    while (true) {
      if (value < tree.value) {
        // console.log(tree.value);
        // console.log("to left");

        tree = tree.left;
        continue;
      } else if (value > tree.value) {
        // console.log(tree.value);
        // console.log("to right");
        tree = tree.right;
        continue;
      } else if (tree.value === value) {
        // console.log("equal");
        caseChecker(tree, value);
        return tree;
      } else {
        console.log("ERROR: value does not exist");
        return "value does not exist";
      }
    }
  };
  return { buildTree, prettyPrint, mainRoot, insert, remove };
};

const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// console.log(array.sort((a, b) => a - b));
const balancedBST = tree();
const root = balancedBST.buildTree(array);
// balancedBST.prettyPrint(root);
// console.log(balancedBST.mainRoot);
// balancedBST.insert(252);
// balancedBST.insert(932);
// balancedBST.insert(213);
// balancedBST.insert(563534);
// balancedBST.insert(6321);
balancedBST.insert(24);

// balancedBST.remove(1);

// balancedBST.prettyPrint(balancedBST.mainRoot.root);
balancedBST.prettyPrint(balancedBST.mainRoot.root);

// balancedBST.remove(23);
balancedBST.remove(1);
balancedBST.prettyPrint(balancedBST.mainRoot.root);
