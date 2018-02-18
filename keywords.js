function buildKeywordsData(types) {
    let tree = {};
    let typesArr = Object.keys(types);

    typesArr.forEach((type) => {
        let dataType = types[type];

        dataType.forEach((entity) => {
            entity = entity.toLowerCase();
            entity = entity.replace(/[\n\r]/g, '');

            tree = this.addBranchPhrase(tree, entity.split(" "), 0, type);

            if (entity.includes("&")) {
                entity = entity.replace(/(^|\s*)&(\s*|$)/g, " and ")
                tree = this.addBranchPhrase(tree, entity.split(" "), 0, type);
            }
        });
    });
    this.tree = tree;
    return tree;
}

function addBranchPhrase(tree, phraseArr, index, type) {
    let key = phraseArr[index];
    tree[key] = tree[key] || {};
    if (phraseArr.length <= (index + 1)) {
        tree[key].types = tree[key].types || [];
        if (tree[key].types.includes(type) === false) {
            tree[key].types.push(type);
        }
        return tree;
    }
    tree[key].nodes = tree[key].nodes || {};
    tree[key].nodes = this.addBranchPhrase(tree[key].nodes, phraseArr, (index + 1), type);
    return tree;
}

/*** Example
 let map = {
    "typeName" : [
        "word1"
        "word2 word3",
        "word2"
    ],
    "typeName2" : [
        "word3",
        "word4 word5" 
    ]
}
***/
let data = buildKeywordsData(map);
/***
data = {
    "word1" : {
        "types" : [
            "typeName"
        ]
    },
    "word2" : {
        "nodes" : {
            "word3" : {
                "types" : [
                    "typeName"
                ]
            }
        },
        "types" : [
            "typeName"
        ]
    },
    "word3" : {
        "types" : [
            "typeName2"
        ]
    },
    "word4" : {
        "nodes" : {
            "word5" : {
                "types" : [
                    "typeName2"
                ]
            }
        }
    }

}
*/

