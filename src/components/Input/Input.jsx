export default function Input({name, type, placeholder, value, setValue}){
    return(
        <label>
            <span>{name}</span>
            <input type={type} placeholder={placeholder} value={value} onChange={e => setValue(e.target.value)} />
        </label>
    )
}