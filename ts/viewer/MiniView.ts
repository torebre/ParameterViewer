//import {Component, bootstrap} from 'angular2';



@Component(

)
    class MiniView {

        constructor(private paper:RaphaelPaper) {
            var outline = paper.rect(0, 0, 100, 800);

            var miniViewWindow = paper.rect(0, 0, 100, 100);
            $(miniViewWindow.node).attr("class", "mediumBold");


            var dragging = false;

            miniViewWindow.drag(
                function () {
                    console.log("Moving");
                    console.log("Event: " + event.movementY);
                    if (dragging && event.movementY != 0) {
                        // TODO Do not allow the user to drag the miniview outside the outline
                        // miniViewWindow.transform("t0," +event.movementY);
                        // miniViewWindow.translate(0, event.movementY);
                        console.log("miniViewWindow.x: " + miniViewWindow.y + ". event.movementY: " + event.movementY);
                        miniViewWindow.attr('y', miniViewWindow.attr('y') + event.movementY);
                    }
                },
                function () {
                    console.log("Starting");
                    dragging = true;
                },
                function () {
                    console.log("Stopping");
                    dragging = false;
                }
            )


        }

    }
