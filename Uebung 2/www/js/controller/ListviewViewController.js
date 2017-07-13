/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class ListviewViewController extends mwf.ViewController {

        constructor() {
            super();
            this.resetDatabaseElement = null;
        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view

            this.resetDatabaseElement = this.root.querySelector("#resetDatabase");
            this.resetDatabaseElement.onclick = () => {
                if(confirm("Soll die Datenbank zurückgesetzt werden?")) {
                    indexedDB.deleteDatabase("mwftutdb");
                }
            };

            this.addNewMediaItem = this.root.querySelector("#addNewMediaItem");
            this.addNewMediaItem.onclick = () => this.createNewItem();

            entities.MediaItem.readAll((items) => {
                this.initialiseListview(items);
            });

            // call the superclass once creation is done
            super.oncreate(callback);
        }

        /*
         * for views with listviews: bind a list item to an item view
         * TODO: delete if no listview is used or if databinding uses ractive templates
         */
         // bindListItemView(viewid, itemview, item) {
         //     // TODO: implement how attributes of item shall be displayed in itemview
         //
         //     super.bindListItemView(viewid, itemview, item);
         // }

        /*
         * for views with listviews: react to the selection of a listitem
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemSelected(listitem, listview) {
            // TODO: implement how selection of listitem shall be handled
            alert("item " + listitem.name + " wurde ausgewählt!");
        }

        /*
         * for views with listviews: react to the selection of a listitem menu option
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemMenuItemSelected(option, listitem, listview) {
            // TODO: implement how selection of option for listitem shall be handled
            super.onListItemMenuItemSelected(option, listitem, listview);
        }

        /*
         * for views with dialogs
         * TODO: delete if no dialogs are used or if generic controller for dialogs is employed
         */
        bindDialog(dialogid, dialog, item) {
            // call the supertype function
            super.bindDialog(dialogid, dialog, item);

            // TODO: implement action bindings for dialog, accessing dialog.root
        }

        deleteItem(item){
            item.delete(() => {
                this.removeFromListview(item._id);
            });
        }

        editItem(item){
            this.showDialog("mediaItemDialog", {
                item: item,
                actionBindings:{
                    submitForm: ((event) => {
                        event.original.preventDefault();
                        item.update(() => {
                            this.updateInListview(item._id, item);
                        });
                        this.hideDialog();
                    }),
                    deleteItem: ((event) => {
                        this.deleteItem(item);
                        this.hideDialog();
                    })
                }
            });
        }

        createNewItem(){
            let randomInt = Math.round(Math.random()*100,0)*10;
            let src = "http://lorempixel.com/"+randomInt+"/"+randomInt+"/";
            var newItem = new entities.MediaItem("", src);
            this.showDialog("mediaItemDialog", {
                item: newItem,
                actionBindings:{
                    submitForm: ((event) => {
                        event.original.preventDefault();
                        newItem.create(() => {
                            this.addToListview(newItem);
                        });
                        this.hideDialog();
                    })
                }
            });
        }
    }

    // and return the view controller function
    return ListviewViewController;
});
