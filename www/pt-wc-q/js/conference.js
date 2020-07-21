export function define_conference_page(QEWD){

    let component = {
        componentName: 'ptwq-content-page',
        state: {
            name: 'conference_page',
            crud_params: {
                title: 'Conference Call'
            }
        },
        children: [
            {
                componentName: 'adminui-content-page-header',
                state: {
                    title: 'Conference Page'
                }
            },
            {
                componentName: 'adminui-content-card',
                state: {
                    name: 'conference-card'
                },
                children: [
                    {
                        componentName: 'adminui-content-card-header',
                        state: {
                            title: 'Fullcalendar Card',
                            title_colour: 'warning'
                        }
                    },
                    {
                        componentName: 'adminui-content-card-body',
                        children: [
                            {
                                componentName: 'ptwq-jitsu',
                                state: {
                                    accessToken: 'pk.eyJ1Ijoicm9idHdlZWQiLCJhIjoiY2s4cjdtMzJ4MDZjYjNldGw0ZDJ6enFlYiJ9._wfDdoSZ2RGPbtJJIlbRfw',
                                    height: '300px'
                                },
                                hooks: ['getJitsu']
                            }
                        ]
                    }
                ]
            }
        ]
    };

    let hooks = {
        'ptwq-jitsu': {
            getJitsu: function() {
               let user = this.context.user;


                this.renderJitsuMeet({}).then((res)=>{
                    console.log('console back');



                    const randomID =
                        Math.random()
                            .toString(36)
                            .substring(2, 8) +
                        "-" +
                        Math.random()
                            .toString(36)
                            .substring(2, 8);
                    console.log("randomID =" + randomID);
                    let block = document.querySelector("#jitsu-meet-window");
                    block.innerHTML = '';
                    const domain = "meet.jit.si";
                    const options = {
                        roomName: "OS-Clinic-Care-SessionID-" + randomID,
                        width: 500,
                        height: 500,
                        parentNode: block,
                        interfaceConfigOverwrite: {
                            HIDE_INVITE_MORE_HEADER: true,
                            TOOLBAR_BUTTONS: [
                                "microphone",
                                "camera",
                                "fodeviceselection",
                                "hangup",
                                "profile",
                                "invite",
                                "chat",
                                "security",
                                "help"
                            ]
                        },
                        //interfaceConfigOverwrite: { filmStripOnly: true },
                        userInfo: {
                            email: "email@jitsiexamplemail.com",
                            displayName: "Dr John Doe"
                        }
                    };
                    const api = new JitsiMeetExternalAPI(domain, options);
                    api.executeCommand('displayName', user.name);

                    api.executeCommand("subject", "Private Telehealth Session");

                    //api.executeCommand("password", "ABC234");
                    //api.executeCommand("toggleFilmStrip");

                    console.log(api.getIFrame());

                    api.addEventListener("participantJoined", function(event) {
                        console.log("id " + id + "nameX " + displayName);
                    });

                    var pass = "ABC2";
                    api.addEventListener("participantRoleChanged", function(event) {
                        // when host has joined the video conference
                        if (event.role == "moderator") {
                            console.log("this person is a Mod");
                            api.executeCommand("password", pass);
                        } else {
                            setTimeout(() => {
                                // why timeout: I got some trouble calling event listeners without setting a timeout :)

                                // when local user is trying to enter in a locked room
                                api.addEventListener("passwordRequired", () => {
                                    api.executeCommand("password", pass);
                                });

                                // when local user has joined the video conference
                                api.addEventListener("videoConferenceJoined", response => {
                                    setTimeout(function() {
                                        api.executeCommand("password", pass);
                                    }, 300);
                                });
                            }, 10);
                        }
                    });
                    $("#jitsu-meet-configure").click(function() {
                        //$("p").slideToggle();
                        api.executeCommand("toggleFilmStrip");
                        console.log(
                            "Meeting Link is https://" + domain + "/" + options.roomName
                        );
                        console.log(
                            Math.random()
                                .toString(36)
                                .substring(2, 8) +
                            "-" +
                            Math.random()
                                .toString(36)
                                .substring(2, 8)
                        );
                    });

                    $("#jitsu-meet-start").click(function() {
                        //$("p").slideToggle();
                        console.log("Setting Password");
                        api.executeCommand("password", "BBC2");
                    });
                });
            }
        }
    };
    return {component, hooks};

}
