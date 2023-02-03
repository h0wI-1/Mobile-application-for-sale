import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import Basket from "./componets/Basket"
import Finish_order from "./componets/Finish_order"
import Main from "./componets/Main"
import Order from "./componets/Order"
import Orders from "./componets/Orders"
import Pay from "./componets/Pay"
import Profil from "./componets/Profil"
import Shop from "./componets/Shop"
import Support from "./componets/Support"
import Shops from "./componets/Shops";
import Pay_order from "./componets/Pay_order"
import Search from "./componets/Search"




const Stack = createStackNavigator();

export default function Navigate() {
    return <NavigationContainer>
        <Stack.Navigator>
            <Stack.Screen
                name='Main'
                component={Main}
                options={
                    {
                        title: "Главная",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)' 
                          },
                        headerTitleStyle: {
                            fontWeight: 'light'
                        }
                    }
                }
            />
             <Stack.Screen
                name='Profil'
                component={Profil}
                options={
                    {
                        title: "Профиль",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                          },
                    }
                }
            />
            <Stack.Screen
                name="Pay"
                component={Pay}
                options={
                    {
                        title: "Способы оплаты",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                          },
                    }
                }
            />
            <Stack.Screen
                name="Orders"
                component={Orders}
                options={
                    {
                        title: "Заказы",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                          },
                    }
                }
            />
            <Stack.Screen
                name="Order"
                component={Order}
                options={
                    {
                        title: "Заказ",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                          },
                    }
                }
            />
            <Stack.Screen
                name="Support"
                component={Support}
                options={
                    {
                        title: "Поддержка",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                          },
                    }
                }
            />
            <Stack.Screen
                name="Shop"
                component={Shop}
                options={
                    {
                        title: "Магазин",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)',
                          },
                    }
                }
            />
            <Stack.Screen
                name='Shops'
                component={Shops}
                options={
                    {
                        title: "Магазины",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)' 
                          },
                        headerTitleStyle: {
                            fontWeight: 'light'
                        }
                    }
                }
            />
            <Stack.Screen
                name='Finish_order'
                component={Finish_order}
                options={
                    {
                        title: "Состав заказа",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)' 
                          },
                        headerTitleStyle: {
                            fontWeight: 'light'
                        }
                    }
                }
            />
            <Stack.Screen
                name='Basket'
                component={Basket}
                options={
                    {
                        title: "Корзина",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)' 
                          },
                        headerTitleStyle: {
                            fontWeight: 'light'
                        }
                    }
                }
            />
            <Stack.Screen
                name='Pay_order'
                component={Pay_order}
                options={
                    {
                        title: "Оплата",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)' 
                          },
                        headerTitleStyle: {
                            fontWeight: 'light'
                        }
                    }
                }
            />
            <Stack.Screen
                name='Search'
                component={Search}
                options={
                    {
                        title: "Поиск",
                        headerStyle: {
                            backgroundColor: 'rgba(239, 239, 239, 1)' 
                          },
                        headerTitleStyle: {
                            fontWeight: 'light'
                        }
                    }
                }
            />
        </Stack.Navigator>
    </NavigationContainer>;
} 