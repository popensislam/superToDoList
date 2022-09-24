import './check.css'

const Checkbox = ({ checked, children, id, onChangeCheck }) => {
    return (
        <>
            <input type="checkbox" checked={checked} className="custom-checkbox" onChange={onChangeCheck} id={id} name={id} value="yes" />
            <label htmlFor={id} style={{color: '#D0D2D6'}}>{children}</label>
        </>
    );
}

export default Checkbox;