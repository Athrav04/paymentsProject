import { Link , useNavigate} from "react-router-dom"
import { useState } from "react"
import eyeOffOutline from "../assets/icons/eyeOffOutline.svg"
import eyeOutline from "../assets/icons/eyeOutline.svg"
import axios from "axios"
import Button from "./Button"


export default function SignUp(){
	const navigate = useNavigate();
	const [loading,setLoading] = useState(false);
	const [show,setShow] = useState(false);
	const [firstName,setfirstName] = useState("");
	const [lastName,setLastName] = useState("");
	const [email,setEmail] = useState("");
	const [username,setUsername] = useState("");
	const [password,setPassword] = useState("");
	function toShow(){
		setShow(!show);
	}
	return(
	<section className="flex justify-center items-center min-h-screen bg-gray-300">
	<div className="bg-white flex shadow px-8 py-8 rounded-[20px] flex-col justify-center flex-wrap mx-auto max-w-md items-center gap-2 ">
		<h1 className=" text-4xl text-black font-bold">Sign Up</h1>
		<p className=" text-slate-400 text-lg">Enter your information to create an account</p>
		<form className="flex flex-col justify-center items-start w-full mt-5 gap-2">
			<p className=" text-black text-lg">Username</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="john1" onChange={(e)=>{
					setUsername(e.target.value);
				}} required ></input>
			<p className=" text-black text-lg">First Name</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="John" onChange={(e)=>{
					setfirstName(e.target.value);
				}}></input>
			<p className=" text-black text-lg">Last Name</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="Doe" onChange={(e)=>{
					setLastName(e.target.value);
				}}></input>
			<p className=" text-black text-lg">Email</p>
			<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" placeholder="JohnDoe@gmail.com" type="email" onChange={(e)=>{
					setEmail(e.target.value);
				}}></input>
			<p className=" text-black text-lg">Password</p>
			<div className="w-full relative flex jusitfy-center items-center">
				{show?<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" type="text" placeholder="password" onChange={(e)=>{
					setPassword(e.target.value);
				}}></input>:
				<input className=" focus:border-black focus:outline-none border-solid border-2 rounded-md w-full h-9 px-2" type="password" placeholder="password" onChange={(e)=>{
					setPassword(e.target.value);
				}}></input>}
				<div className="absolute right-3">
					{show? <img src={eyeOutline} onClick={toShow} height={30} width={30}></img>:
					<img src={eyeOffOutline} onClick={toShow} height={30} width={30}></img>}
					
				</div>
				</div>
			
			
		</form>
		<Button onClick={async()=>{
			console.log({
				username,
				firstName,
				lastName,
				email,
				password
			})
				setLoading(true);
				const query = await axios.post("http://localhost:3000/api/v1/user/signUp",{
					username,
					firstName,
					lastName,
					email,
					password
				})
				setLoading(false);
				console.log(JSON.stringify(query))
				console.log(`Sign In query ${JSON.stringify(query.data)}`);
				if(query.status == 200){
					navigate('/Dashboard')
				}
			}} text="Sign Up" isDisabled={loading}/>
		<p className=" text-lg text-black">Already have a account? <Link to='/SignIn' className=" underline decoration-solid">Login</Link></p>
	</div>
	</section>
	)
	}
