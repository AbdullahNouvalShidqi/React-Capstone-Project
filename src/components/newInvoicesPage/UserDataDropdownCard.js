import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { clearUsersState, getAllCostumer, getUserDropdownData, getUserDropdownStatus } from "../../redux/reducers/userDropDownSlice";

const USER_DUMMY = [
    {
        id: 0,
        name: "Abdullah Nouval Shidqi",
        email: "abdullah.nouval@gmail.com",
        address: "Jl kawista no 2",
    },
    {
        id: 1,
        name: "Alvin Wiraprathama",
        email: "wiraprathamaalvin@gmail.com",
        address: "Jalan Gajah Waktra no 1",
    },
    {
        id: 2,
        name: "Deni Subardi",
        email: "deni.subardi@gmail.com",
        address: "Jalan Sumatra no 40",
    },
]

const UserDataDropdownCard = (props) => {
    const { onClick, currentEmail } = props;
    const dispatch = useDispatch();
    const userDropdownData = useSelector(getUserDropdownData);
    const userDropDownStatus = useSelector(getUserDropdownStatus);
    const [ userData, setUserData ] = useState([]);

    useEffect(() => {
        if(userDropDownStatus.loading)return;
        dispatch(getAllCostumer());
    }, [])

    useEffect(() => {
        if(userDropDownStatus.error){
            Swal.fire({
                icon: 'error',
                title: 'Get costumers suggestion failed, try again',
                text: `${userDropDownStatus.errMsg}`,
                confirmButtonText: 'Yes',
                confirmButtonColor: '#173468',
            })
            dispatch(clearUsersState());
        }
        if(userDropdownData !== null){
            setUserData(() => userDropdownData.filter((data) => data.email.toLowerCase().includes(currentEmail.toLowerCase())));
        }
    }, [currentEmail, userDropdownData, dispatch, userDropDownStatus])

    return(
        <div className="user-suggestion-container">
            {userData.length === 0 ? <div className="user-suggestion-card">No user data found</div> : userData.map((data, i) => {
                return (
                    <div key={i} className="user-suggestion-card" onClick={() => onClick(data)}>
                        <div className="email-text">{data.email}</div>
                        <div className="name-text">{data.full_name}</div>
                    </div>
                )
            })}
        </div>
    );
}

export default UserDataDropdownCard;