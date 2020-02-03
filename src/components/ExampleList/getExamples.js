import TypeIt from "typeit";

export default (addToTimeoutStore) => {

    return {
        "simple-string": {
            title: "Type a simple string.",
            description:
                "At it's most basic level, just target an element, define a string, and voilà.",
            func: element => {
                return new TypeIt(element, {
                    strings: "This is a simple string.",
                    waitUntilVisible: true
                }).go();
            }
        },
        "multiple-strings": {
            title: "Type multiple strings.",
            description:
                "To type multiple strings that stack on top of each other, pass an array of them.",
            func: element => {
                return new TypeIt(element, {
                    strings: ["This is a great string.", "But here is a better one."],
                    speed: 50,
                    waitUntilVisible: true
                }).go();
            }
        },
        "form-inputs": {
            title: "Type into form elements.",
            description:
                "Target any input or textarea like any other element, and you're set.",
            func: element => {
                return new TypeIt(element, {
                    strings: "Alex MacArthur",
                    waitUntilVisible: true
                }).go();
            },
            element: "input"
        },
        "companion-methods": {
            title: "Type dynamic, life-like effects.",
            description:
                "Use the included companion methods to control an effect down to the smallest detail.",
            func: element => {
                return new TypeIt(element, {
                    speed: 200,
                    waitUntilVisible: true
                })
                    .type("THe")
                    .pause(200)
                    .delete(2)
                    .type("he, ")
                    .pause(1000)
                    .type("possibilities are...")
                    .break()
                    .pause(750)
                    .options({ speed: 50 })
                    .type(" totally endlss!")
                    .pause(750)
                    .delete(3)
                    .pause(200)
                    .type("ess!")
                    .go();
            }
        },
        "freeze-unfreeze": {
            title: "Pause & resume on demand.",
            description: "Included `freeze()` and `unfreeze()` methods make it easy.",
            allowFreeze: true,
            func: element => {
                const instance = new TypeIt(element, {
                    strings: "Click the 'freeze' button to freeze and unfreeze this instance as much as you want.",
                    waitUntilVisible: true
                }).go();

                return instance;
            }
        },
        "after-step-callback": {
            title: "Fire code at key points of any animation.",
            description:
                "Callback methods are available for before and after each string or character is typed, as well as after the entire instance is finished.",
            func: element => {
                return new TypeIt(element, {
                    strings: ["Look, it's rainbow text!"],
                    afterStep: function (step, queue, instance) {
                        let letters = "0123456789ABCDEF";
                        let color = "#";
                        for (var i = 0; i < 6; i++) {
                            color += letters[Math.floor(Math.random() * 16)];
                        }
                        element.style.color = color;
                    }
                }).go();
            }
        },
        "exec-companion-method": {
            title: "Fire any arbitrary code whenever.",
            description:
                "If the provided callback methods aren't enough, the included `.exec()` method allows you to fire code at any point during the animation, and is async-friendly.",
            func: element => {
                return new TypeIt(element, {
                    waitUntilVisible: true
                })
                    .type("Hold up!")
                    .exec(async () => {
                        //-- Return a promise that resolves after something happens.
                        await new Promise((resolve, reject) => {
                            let ti = setTimeout(() => {
                                return resolve();
                            }, 2000);

                            addToTimeoutStore("exec-companion-method", ti);
                        });
                    })
                    .type(" OK, now go.")
                    .go();
            }
        }
    };
}