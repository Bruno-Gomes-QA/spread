import { View } from "react-native";

export default function ({data}) {
    return (
        <View style={{flexDirection: 'row', height: 64 }}>
            {data.map((_, i) => {
                return (
                    <View
                        style={{height: 10, borderRadius: 5, width: 10, marginHorizontal: 8, backgroundColor: '#FD8033'}}
                        key={i.toString()}
                    />
                )
            })}
        </View>
    )
}