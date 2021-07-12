
//$('head').append('<link rel="stylesheet" href="'+viewConfig.dpath+'/css/header.css">');
var headerConfig = {
    admin:{
        logo:{
            name:"Oso AOS",
            id:"osoAOS",
            url:viewConfig.urlRoot+'/home/img/header/osoLogo.png',
            view:viewConfig.urlRoot+'/home/?view=overview&type=infrm&docId=1_enterprise'
        },
        nav:{
            infrm:{
                name:"Information",
                view:viewConfig.urlRoot+'/home/?view=adminList&type=infrm&hdr=admin'
                // ,sub:{
                //     enterprise:{
                //         name:"Enterprises",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     offering:{
                //         name:"Offerings",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     initiative:{
                //         name:"Initiatives",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     solution:{
                //         name:"Solutions",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     project:{
                //         name:"Projects",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     deliverable:{
                //         name:"Deliverables",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     task:{
                //         name:"Tasks",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     }
                // }
            },
            wrkflo:{
                name:"Workflows",
                view:viewConfig.urlRoot+'/home/?view=adminList&type=wrkflo&hdr=admin'
                // ,sub:{
                //     framwork:{
                //         name:"Frameworks",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     step:{
                //         name:"steps",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     process:{
                //         name:"Processes",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     function:{
                //         name:"Functions",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     },
                //     procedure:{
                //         name:"Procedures",
                //         view:"",
                //         sub:{
                //             create:{
                //                 name:"Create",
                //                 view:""
                //             }
                //         }
                //     }
                // }
            }
            // ,team:{
            //     name:"Teams",
            //     view:"viewConfig.urlRoot+'/home/?view=list&type=team'"
            //     ,sub:{
            //         capability:{
            //             name:"Enterprise Capabilities",
            //             view:"",
            //             sub:{
            //                 create:{
            //                     name:"Create",
            //                     view:""
            //                 }
            //             }
            //         },
            //         departments:{
            //             name:"Departments",
            //             view:"",
            //             sub:{
            //                 create:{
            //                     name:"Create",
            //                     view:""
            //                 }
            //             }
            //         },
            //         roles:{
            //             name:"Enterprise Capabilities",
            //             view:"",
            //             sub:{
            //                 create:{
            //                     name:"Create",
            //                     view:""
            //                 }
            //             }
            //         }
            //     }
            // }
        }
    },
    aos:{
        logo:{
            name:"Oso AOS",
            id:"osoAOS",
            url:viewConfig.urlRoot+'/home/img/header/osoLogo.png',
            view:viewConfig.urlRoot+'/home/?view=overview&type=infrm&docId=1_enterprise'
        },
        nav:{
            idea:{
                name:"Idea Incubation",
                view:viewConfig.urlRoot+'/home/?view=overview&type=infrm&docId=2_offering'
            },
            align:{
                name:"Alignment Services",
                view:viewConfig.urlRoot+'/home/?view=overview&type=infrm&docId=3_offering'
            },
            admin:{
                name:"Admin",
                view:viewConfig.urlRoot+'/home/?view=adminList&type=infrm&hdr=admin'
            }
        }
    }
};
var hedr = viewConfig.header;
//console.log('header is',hedr);
var header = headerConfig[hedr];
//console.log('headerconfig',header);
var headerHTML = '<div class="row header">';
    headerHTML += '<div class="col-1"></div><div class="col-1">';
        headerHTML += '<a href="'+header.logo.view+'"> <img class="headerImg" id="'+header.logo.id+'" src ="'+header.logo.url+'"/></a>';
    headerHTML += '</div>'
 headerHTML += '<div class="col-10"><ul class="slimmenu">';
for (const [key, value] of Object.entries(header.nav)) {
    headerHTML += '<li><a href="'+value.view+'">'+value.name+'</a>';
    if(value.sub){
        headerHTML += '<ul>';
        for (const [ke, val] of Object.entries(value.sub)) {
            headerHTML += '<li><a href="'+val.view+'">'+val.name+'</a>';
            if(val.sub){
                headerHTML += '<ul>';
                for (const [k, v] of Object.entries(val.sub)) {
                    headerHTML += '<li><a href="'+v.view+'">'+v.name+'</a></li>';
                }
                headerHTML += '</ul>';
            }
            headerHTML += '</li>';
        }
        headerHTML += '</ul></div>';
    }
}
$.getScript(viewConfig.dpath+"/js/vendor/slimmenu/src/js/jquery.slimmenu.js", function() {
    $('header').html(headerHTML);
    $('.slimmenu').slimmenu({
        resizeWidth: '800',
        collapserTitle: 'Main Menu',
        animSpeed:'medium',
        indentChildren: true,
        childrenIndenter: '&raquo;'
    });
});      