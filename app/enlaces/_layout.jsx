import { Stack } from "expo-router"

export default function EnlacesLayout (){
    return(
        <Stack screenOptions={{headerShown: false}}>
            <Stack.Screen name="index"/>
        </Stack>      
    );
};