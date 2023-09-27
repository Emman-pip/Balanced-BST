const node = (value, left = null, right = null) => {
  return { value, left, right };
};

// TODO: return true if successful execution, false otherwise

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

  const case1 = (value, tree = mainRoot.root) => {
    // console.log("case 1");
    try {
      while (true) {
        if (
          value === tree.left.value &&
          tree.left.right === null &&
          tree.left.left === null
        ) {
          console.log("removed " + value);
          tree.left = null;
          break;
        }

        // loop through condition
        if (value < tree.value) {
          tree = tree.left;
          continue;
        } else if (value > tree.value) {
          tree = tree.right;
          continue;
        } else if (tree.value == null) {
          console.log(`no ${value} found`);
          return `no ${value} found`;
        }
      }
    } catch (e) {
      if (
        value === tree.right.value &&
        tree.right.right === null &&
        tree.right.left === null
      ) {
        tree.right = null;
      }
    }
  };
  const case2 = (value, tree = mainRoot.root) => {
    try {
      while (tree.left.value) {
        if (
          // for right
          value == tree.left.value &&
          tree.left.right != null &&
          tree.left.left == null
        ) {
          console.log("removed " + value);

          tree.left = tree.left.right;
          break;
        } else if (
          // for left
          tree.right.value === value
        ) {
          throw "catch";
        }
        // loop through condition
        if (value < tree.value) {
          tree = tree.left;
          continue;
        } else if (value > tree.value) {
          tree = tree.right;

          if (tree === null) {
            console.log("error");
            break;
          }
          continue;
        } else if (tree.value == null) {
          console.log(`no ${value} found`);
          return `no ${value} found`;
        }
      }
    } catch (err) {
      console.log("catchtree:", err);
    }
  };

  const case2v2Logic = (value, tree) => {
    while (tree.left.value) {
      if (
        // for left
        value == tree.left.value &&
        tree.left.left != null
      ) {
        console.log("removed " + value);
        tree.left = tree.left.left;
        break;
      }
      // loop through condition
      if (value < tree.value) {
        tree = tree.left;
        continue;
      } else if (value > tree.value) {
        tree = tree.right;

        if (tree === null) {
          console.log("error");
          break;
        }
        continue;
      } else if (tree.value == null) {
        console.log(`no ${value} found`);
        return `no ${value} found`;
      }
    }
  };

  const case2v2 = (value, tree = mainRoot.root) => {
    console.log("case 2v2");
    try {
      case2v2Logic(value, tree);
    } catch (err) {
      console.log("catcherror: " + err);
    }
  };
  const case3 = (value, tree = mainRoot.root) => {
    console.log("case 3");
    tree.left.right = tree.right;
  };

  const caseChecker = (tree, value) => {
    console.log(tree);
    if (tree.right === null && tree.left === null) {
      case1(value);
    } else if (tree.right != null && tree.left === null) {
      case2(value);
    } else if (tree.right === null && tree.left != null) {
      case2v2(value);
    } else if (tree.right != null && !tree.left != null) {
      case3(value, tree);
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

  const findLogic = (bst, value) => {
    while (bst.value) {
      if (value < bst.value) {
        bst = bst.left;
        continue;
      } else if (value > bst.value) {
        bst = bst.right;
        continue;
      } else if (bst.value === value) {
        console.log("value found");
        return true;
      }
    }
  };

  const find = (value) => {
    let bst = mainRoot.root;
    try {
      findLogic(bst, value);
    } catch (e) {
      console.log("not found");
      return false;
    }
  };

  const levelOrderLogic = (value, bst) => {
    while (bst.value) {
      if (value < bst.value) {
        bst = bst.left;
        continue;
      } else if (value > bst.value) {
        bst = bst.right;
        continue;
      } else if (bst.value === value) {
        // console.log("value found");
        return bst;
      }
    }
  };

  const levelOrder = (func = null) => {
    const levelOrderArray = [];
    const queue = [];
    let pointer1 = mainRoot.root;
    try {
      if (!func == null) {
      }
      // next three lines will be the checker of each node

      if (queue.length === 0) {
        queue.push(pointer1.value);
      }
      queue.push(pointer1.left.value);
      queue.push(pointer1.right.value);
      while (true) {
        let bst = mainRoot.root;

        levelOrderArray.push(queue.shift());
        let nextNode = levelOrderLogic(queue[0], bst);
        if (nextNode.left != null) {
          queue.push(nextNode.left.value);
        }
        if (nextNode.right != null) {
          queue.push(nextNode.right.value);
        }

        if (nextNode.right == null && nextNode.left == null) {
          levelOrderArray.push(queue.shift());
        }

        if (queue.length === 1 || queue.length === 0) {
          if (queue.length != 0) {
            levelOrderArray.push(queue.shift());
          }
          if (func != null) {
            return levelOrderArray.map(func);
          }
          return levelOrderArray;
        }
      }
      // levelOrderArray.push(queue.shift());
    } catch (err) {
      console.log("ERROR:", err);
      return "Error: " + err;
    }
  };

  //TODO: INORDER (LNR)
  const inorder = (func) => {
    const result = [];
    const trueRoot = mainRoot.root;
    // let i = 0;
    const left = "left";
    const right = "right";
    const value = "value";
    let direction = left;
    let root = trueRoot;
    let operation;
    const reset = 0;
    const keep = 1;
    while (true) {
      if (operation === reset) {
        root = trueRoot;
      }
      while (true) {
        let leftnut = root[direction][direction];
        // console.log(!(root.left.left.value === null));

        // can be refactored to a recursive function for easier logic
        // if (root[right])

        if (result.includes(root[value])) {
          if (root[right] === null) {
            operation = reset;

            break;
          }
          root = root[right];
          if (!(root[left] === null)) {
            operation = keep;

            break;
          }
          result.push(root[value]);
          operation = reset;
          break;
        }

        if (result.includes(root[direction][value])) {
          result.push(root[value]);
          continue;
        }
        if (leftnut === null) {
          result.push(root[direction][value]);
        }
        if (!(leftnut === null)) {
          console.log("not null yet");
          root = root[direction];
          continue;
        } else {
          console.log("lol");
          result.push(root[value]);
          console.log("broken!");
          continue;
        }
      }
      // console.log(result);
      // if (i === 10) {
      //   console.log("done");
      //   break;
      // }
      // i++;
    }
  };
  //TODO: PREORDER (LRN)
  //TODO: POSTORDER (NLR)

  return {
    buildTree,
    prettyPrint,
    mainRoot,
    insert,
    remove,
    find,
    levelOrder,
    inorder,
  };
};

(() => {
  const array = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
  // console.log(array.sort((a, b) => a - b));
  const balancedBST = tree();
  const root = balancedBST.buildTree(array);
  // balancedBST.prettyPrint(root);
  // console.log(balancedBST.mainRoot);
  balancedBST.insert(252);
  balancedBST.insert(932);
  balancedBST.insert(213);
  balancedBST.insert(563534);
  balancedBST.insert(6321);
  balancedBST.insert(2);
  balancedBST.insert(0);

  // balancedBST.remove(1);

  // balancedBST.prettyPrint(balancedBST.mainRoot.root);
  balancedBST.prettyPrint(balancedBST.mainRoot.root);

  // balancedBST.remove(23);
  // TODO: FIX CASE 2 left side
  // balancedBST.remove(3);
  // balancedBST.remove(23);
  // balancedBST.remove(1);
  // console.log(
  //   balancedBST.levelOrder((list) => {
  //     return list;
  //   })
  // );
  balancedBST.inorder();

  // console.log(balancedBST.levelOrder());
  balancedBST.prettyPrint(balancedBST.mainRoot.root);
  // balancedBST.find(213);
})();
