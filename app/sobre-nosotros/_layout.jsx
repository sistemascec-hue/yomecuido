import { Stack } from "expo-router";

export default function NosotrosLayout(){
    return(
        <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="index"/>
    </Stack>
    );
    
}