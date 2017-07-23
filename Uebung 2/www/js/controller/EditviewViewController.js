/**
 * @author Jörn Kreutel
 */
define(["mwf", "entities"], function (mwf, entities) {

    class EditviewViewController extends mwf.ViewController {

        constructor() {
            super();

            // this.mediaItem = new entities.MediaItem("dummy item", "./content/img/lorempixel_200x100.jpg");
            // this.mediaItem.description = "lorem ipsum dol"
            console.log("EditviewViewController()");
        }

        /*
         * for any view: initialise the view
         */
        oncreate(callback) {
            // TODO: do databinding, set listeners, initialise the view
            this.mediaItem = this.args.item;
            if (!this.mediaItem) {
                this.mediaItem = new entities.MediaItem();
            }

            var viewProxy = this.bindElement("editviewTemplate", {item: this.mediaItem}, this.root).viewProxy;
            viewProxy.bindAction("submitForm", (event) => {
                event.original.preventDefault();
                this.submitForm();
                //    return false;
            });

            viewProxy.bindAction("deleteItem", () => {
                this.mediaItem.delete(() => {
                    this.previousView();
                });
            });

            this.form = this.root.querySelector("form");
            this.form.querySelector("#urlRadio").setAttribute("checked", true);

            this.srcfileField = this.form.srcfile;
            this.srcfileField.onchange = () => {
                var objectUrl = URL.createObjectURL(this.srcfileField.files[0]);
                this.mediaItem.src = objectUrl;
                this.mediaItem.contentType = this.srcfileField.files[0].type;
                viewProxy.update({item: this.mediaItem});
                if (this.mediaItem.mediaType == "image")this.root.querySelector("img").src = objectUrl;
                else this.root.querySelector("video").src = objectUrl;
            };

            if (this.mediaItem.src) {
                this.srcfileField.required = "";
            } else {
                this.form.src.type = "url";
            }

            this.form.querySelector("#urlField").addEventListener("blur", (event) => {
                var urlValue = event.target.value;
                if (urlValue.match("http://*")) {
                    this.root.querySelector("img").src = urlValue;
                }
            });

            if (this.application.currentCRUDScope == "local") {
                this.root.querySelector(".mwf-radiogroup").setAttribute("hidden", true);
            }

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

        submitForm() {
            var srcfilecontent = this.srcfileField.files[0];
            if (this.mediaItem.srcType == 'upload' && srcfilecontent) {
                var formdata = new FormData();
                formdata.append("src", srcfilecontent);

                var xhr = new XMLHttpRequest();
                xhr.onreadystatechange = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        var responseJSON = JSON.parse(xhr.responseText);
                        this.mediaItem.src = responseJSON.data.src;
                        console.log("EditviewViewController.submitForm(): Data is uploaded!");
                        this.saveItem();
                    }
                };
                xhr.open("POST", "api/upload");
                xhr.send(formdata);
            } else {
                this.saveItem();
            }
        }

        saveItem() {
            if (this.mediaItem.created) {
                this.mediaItem.update(() => {
                    this.previousView();
                });
            } else {
                this.mediaItem.create(() => {
                    this.previousView();
                });
            }
        }
        
        onback(){
            var videoElem = this.root.querySelector("video");
            if(videoElem){
                videoElem.pause();
            }
            super.onback();
        }
    }

    // and return the view controller function
    return EditviewViewController;
});
