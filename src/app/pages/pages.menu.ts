export const PAGES_MENU = [
  {
    path: 'pages',
    children: [
      {
        path: 'choferes',
        data: {
          menu: {
            title: 'Choferes',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        },
        children: [
          {
            path: 'create',
            data: {
              menu: {
                title: 'Registrar',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'all',
            data: {
              menu: {
                title: 'Ver todos',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          }
        ]
      },
      {
        path: 'ordenes',
        data: {
          menu: {
            title: 'Orden',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          },
        },
        children: [
          {
            path: 'create',
            data: {
              menu: {
                title: 'Registrar orden',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
          {
            path: 'all',
            data: {
              menu: {
                title: 'Ver todas',
                icon: 'ion-person-stalker',
                selected: false,
                expanded: false,
                order: 0
              }
            }
          },
        ]
      },
      {
        path: 'conceptos',
        data: {
          menu: {
            title: 'Conceptos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'vehiculos',
        data: {
          menu: {
            title: 'Vehiculos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'permisotaxis',
        data: {
          menu: {
            title: 'Permisos taxis',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'permisotaxiasignados',
        data: {
          menu: {
            title: 'Asignar permisos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'fianzas',
        data: {
          menu: {
            title: 'Fianzas',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'talleres',
        data: {
          menu: {
            title: 'Talleres',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'mecanicos',
        data: {
          menu: {
            title: 'Mecánicos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'modulos',
        data: {
          menu: {
            title: 'Módulos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'bonificaciones',
        data: {
          menu: {
            title: 'Bonifiaciones',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'corralones',
        data: {
          menu: {
            title: 'Corralón',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'enviotalleres',
        data: {
          menu: {
            title: 'Envío a taller',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'egresoconceptos',
        data: {
          menu: {
            title: 'Egreso de conceptos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'liquidaciones',
        data: {
          menu: {
            title: 'Liquidaciones',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'refacciones',
        data: {
          menu: {
            title: 'Refacciones',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'vehiculoreparandos',
        data: {
          menu: {
            title: 'Vehiculo reparandose',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
      {
        path: 'permisos',
        data: {
          menu: {
            title: 'Asignar permisos',
            icon: 'ion-social-buffer',
            selected: false,
            expanded: false,
            order: 0
          }
        }
      },
        // children: [
        //   {
        //     path: 'all',
        //     data: {
        //       menu:
        //     }
        //   }
        // ]
      // {
      //   path: 'admin',
      //   data: {
      //     menu: {
      //       title: 'general.menu.admin',
      //       icon: 'ion-person-stalker',
      //       selected: false,
      //       expanded: false,
      //       order: 0
      //     }
      //   },
      //   children: [
      //     {
      //       path: 'users',
      //       data: {
      //         menu: {
      //           title: 'general.menu.usuarios',
      //           icon: 'ion-person-stalker',
      //           selected: false,
      //           expanded: false,
      //           order: 0
      //         }
      //       }
      //     },
      //     {
      //       path: 'groups',
      //       data: {
      //         menu: {
      //           title: 'general.menu.grupos',
      //           icon: 'ion-ios-people',
      //           selected: false,
      //           expanded: false,
      //           order: 1
      //         }
      //       }
      //     },
      //     {
      //       path: 'social-reasons',
      //       data: {
      //         menu: {
      //           title: 'general.menu.razones',
      //           icon: 'ion-person-stalker',
      //           selected: false,
      //           expanded: false,
      //           order: 2
      //         }
      //       }
      //     },
      //     {
      //       path: 'tipo-obra',
      //       data: {
      //         menu: {
      //           title: 'general.menu.tipo-obra',
      //           icon: 'ion-social-buffer',
      //           selected: false,
      //           expanded: false,
      //           order: 3
      //         }
      //       }
      //     },
      //     {
      //       path: 'obra-categories',
      //       data: {
      //         menu: {
      //           title: 'general.menu.obra-categories',
      //           icon: 'ion-social-buffer',
      //           selected: false,
      //           expanded: false,
      //           order: 3
      //         }
      //       }
      //     }
      //   ]
      // }
    ]
  }
];

