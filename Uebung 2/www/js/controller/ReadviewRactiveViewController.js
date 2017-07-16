/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class ReadviewRactiveViewController extends mwf.ViewController {

        constructor() {
            super();

            console.log("ReadviewRactiveViewController()");
            this.viewProxy = null;
        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view

            var mediaItem = this.args.item; //new entities.MediaItem("dummy item", "./content/img/lorempixel_200x100.jpg");
            this.viewProxy = this.bindElement("mediaReadviewTemplate", {item: mediaItem}, this.root).viewProxy;
            this.viewProxy.bindAction("deleteItem",(() => {
                mediaItem.delete(() => {
                    //this.previousView({deletedItem: mediaItem});
                    this.notifyListeners(new mwf.Event("crud","deleted","MediaItem",mediaItem._id));
                    this.previousView();
                })
            }));

            // call the superclass once creation is done
            super.oncreate(callback);
        }

        /*
         * for views with listviews: bind a list item to an item view
         * TODO: delete if no listview is used or if databinding uses ractive templates
         */
        bindListItemView(viewid, itemview, item) {
            // TODO: implement how attributes of item shall be displayed in itemview
        }

        /*
         * for views with listviews: react to the selection of a listitem
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemSelected(listitem, listview) {
            // TODO: implement how selection of listitem shall be handled
        }

        /*
         * for views with listviews: react to the selection of a listitem menu option
         * TODO: delete if no listview is used or if item selection is specified by targetview/targetaction
         */
        onListItemMenuItemSelected(option, listitem, listview) {
            // TODO: implement how selection of option for listitem shall be handled
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


    }

    // and return the view controller function
    return ReadviewRactiveViewController;
});
