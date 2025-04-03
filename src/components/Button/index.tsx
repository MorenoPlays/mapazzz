import { TouchableOpacity , TouchableOpacityProps, Text} from "react-native";
import { style } from "./styles"

type Props = TouchableOpacityProps & {
    title: string
}

export function Button({title, ...rest}:Props)
{
    return(
    <TouchableOpacity activeOpacity={0.5} style={style.button} {...rest}>
        <Text style={style.title}>{title}</Text>
    </TouchableOpacity>
    );
}