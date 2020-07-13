export function cSchemaLookup(tree, componentName, stateName){
    console.log(tree);
    if(tree.componentName === componentName){
        console.log('THAT IS!');
        if(tree.state && tree.state.name && tree.state.name === stateName){
            if(!tree.children){
                tree.children = [];
            }
            return tree;
        }else{
            if(!stateName){
                return tree;
            }
        }
    }

    if(tree.children){

        let result = null;
        tree.children.forEach((child, key)=>{
            if(!result) {
                let temp = cSchemaLookup(child, componentName, stateName)
                if (temp) {
                    result = temp;
                }
            }
        });
        return result;
        // Foreach childrens
    }
    return null;
}
