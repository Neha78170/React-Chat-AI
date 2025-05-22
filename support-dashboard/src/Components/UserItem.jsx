const UserItem = ({user})=>{
     <li className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded cursor-pointer">
        <span className={`h-3 w-3 rounded-full user.online ? "bg-green-500": "bg-gray-400"`}>
        </span>
        <span className="text-gray-800">
            {user.name}
        </span>
     </li>
}
export default UserItem