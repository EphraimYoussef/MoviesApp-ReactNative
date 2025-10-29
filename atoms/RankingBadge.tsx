import { View, Text, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

interface RankingBadgeProps {
    index: number;
}

const RankingBadge: React.FC<RankingBadgeProps> = ({ index }) => {
    const [fontsLoaded] = useFonts({
        'BebasNeue-Regular': require('../assets/fonts/BebasNeue-Regular.ttf'),
    });

    if (!fontsLoaded) return null;

    const colors: [string, string] =
        index === 0
        ? ['#F9D423', '#FF4E50']
        : index === 1
        ? ['#D7D2CC', '#304352']
        : index === 2
        ? ['#D1913C', '#FFD194']
        : ['#434343', '#0000f0'];

    return (
        <View style={styles.container}>
            <View style={styles.shadowLayer}>
                <MaskedView
                maskElement={<Text style={styles.numberText}>{index + 1}</Text>}
                >
                <LinearGradient
                    colors={colors}
                    style={styles.gradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                />
                </MaskedView>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 130,
        left: -12,
    },
    shadowLayer: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.7,
        shadowRadius: 8,
    },
    numberText: {
        fontSize: 95,
        fontWeight: '900',
        fontFamily: 'BebasNeue-Regular',
        color: 'black',
        textShadowColor: 'rgba(0,0,0,0.9)',
        textShadowOffset: { width: 2, height: 3 },
        textShadowRadius: 5,
    },
    gradient: {
        width: 200,
        height: 200,
    },
});

export default RankingBadge;
