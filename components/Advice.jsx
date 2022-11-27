import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Pressable  } from 'react-native';

export default function Advice() {
    const [adviceData,setAdviceData] = useState({})
    const [loading,setLoading] = useState(false)
    const [clicked,setClicked] = useState(false)
    
    //get function
    const fetchData = async () => {
        const res = await fetch('https://api.adviceslip.com/advice')
        const data = await res.json()
        setAdviceData(data)
        setLoading(false)
    }

    //get data while rendering component
    useEffect(() => {
        fetchData()
    },[clicked])

  return (
    <View style={AdviceStyles.container}>

        {
            loading ? <Text>Loading...</Text>
            :
            <View style={AdviceStyles.advicebox}>
                <Text style={AdviceStyles.advicenumber}>Advice # {adviceData?.slip?.id}</Text>
                <Text style={AdviceStyles.advicetext}>{adviceData?.slip?.advice}</Text>
                <Pressable  title='Get New Advice'style={AdviceStyles.btn} onPress={() => setClicked(!clicked)}>
                    <Text style={{color:'#F5F5F5'}}>Get Advice</Text>
                </Pressable >
            </View>
        }
    </View>
  );
}

const AdviceStyles = StyleSheet.create({
    container: {
        width:'100%',
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    advicebox:{
        width:'80%',
        height:'10%',
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        textAlign:'center',
    },
    advicenumber:{
        color:'#fdc435',
        fontSize:'20',
        marginBottom:20,
    },
    advicetext:{
        fontSize:'16',
        color:'whitesmoke',
        textAlign:'center'

    },
    btn:{
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 25,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#fdc435',
        marginTop:20,
    }
});
