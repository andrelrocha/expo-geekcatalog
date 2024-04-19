import { styled } from "@gluestack-ui/themed";
import { colors } from "../../../utils/colors";
import { Input as GLInput } from "@gluestack-ui/themed"; 

const Input = styled(
    GLInput,
    {
        height: 50,
        borderColor: colors.gray,
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        paddingRight: 10,
        _input: {
            flex: 1,
            height: '100%',
            padding: 0,
            margin: 0,
            fontSize: 16,
        },
    },
    {
        descendantStyle: ["_input"],
    }
);

export default Input;