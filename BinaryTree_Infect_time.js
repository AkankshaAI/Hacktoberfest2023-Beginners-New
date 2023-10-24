// JS code for Minimum time required to infect all the nodes of Binary tree
class Node
{
	constructor(item)
	{
		this.item = item;
		this.left = this.right = null;
	}
}
var node=null;
var item=null;
function findParent(root, p, parent,start)
{
if (root == null)
	return;

// Store parent of current node
parent[root.item] = p;
if (root.item == start) {
node = root;
}

findParent(root.left, root, parent, start);
findParent(root.right, root, parent, start);
}


function amountOfTime(root,start)
{
	let parent = new Array(100005);
	parent.fill(null);

	findParent(root, null, parent, start);

	let visited=new Array(100005);
	visited.fill(false);

	let q=[];

	// Push special tree node into the
	// queue and make it visited.
	q.push(node);
	visited[start] = true;

	// This store the minimum time require
	// to infect all the tree node.
	let result = -1;

	while (q.length > 0) {
		let n = q.length;

		for (let i = 0; i < n; i++) {
			let curr = q[0];
			let currNode = curr.item;
			q.shift();

			// Check if parent of currNode
			// exist and not visited yet
			// then push this parent of
			// current node into queue.
			if (parent[currNode] != null
				&& visited[parent[currNode].item]
					== false) {
				visited[parent[currNode].item] = true;
				q.push(parent[currNode]);
			}

			// Check if current node left
			// child exist and not
			// visited yet.
			if (curr.left
				&& visited[curr.left.item] == false) {
				visited[curr.left.item] = true;
				q.push(curr.left);
			}

			// Check if current node right
			// child exist and not
			// visited yet.
			if (curr.right
				&& visited[curr.right.item] == false) {
				visited[curr.right.item] = true;
				q.push(curr.right);
			}
		}

		// Increment the time
		result++;
	}

	// Return the result.
	return result;
}


// Driver Code
	/*	 10
		/ \
		12 13
			/ \
			14 15
			/ \ / \
		21 22 23 24

		Let us create Binary Tree as shown
		above */

	let root = new Node(10);
	root.left = new Node(12);
	root.right = new Node(13);

	root.right.left = new Node(14);
	root.right.right = new Node(15);

	root.right.left.left = new Node(21);
	root.right.left.right = new Node(22);
	root.right.right.left = new Node(23);
	root.right.right.right = new Node(24);

	let start = 14;

	// Function call
	let result = amountOfTime(root, start);
	console.log(result);
	
	// This code is contributed by SumitAwate
