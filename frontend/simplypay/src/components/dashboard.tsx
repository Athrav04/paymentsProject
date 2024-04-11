import UserCard from "./UserCard";
import Contacts from "./Contacts";


export default function Dashboard(props){
	let alphabet:String = props.name || "U";
	return (
	<section className="flex flex-col flex-wrap justify-center items-start gap-5">
		<nav className="flex justify-between w-full shadow-md px-7 py-7">
			<p className="text-4xl font-bold text-black">Payments App</p>
			<div className="flex ">
				<p className="text-xl text-black font-medium h-full mt-3 mr-1">Hello, </p>
				<div className="rounded-full bg-slate-500 h-12 w-12 flex justify-center mt-1 mr-2 ">
					<p className="flex flex-col justify-center h-full text-lg">{alphabet}</p>
				</div>
			</div>
		</nav>
		<p className="ml-7 mt-2 text-2xl font-bold text-black w-full">Your Balance ,  Rs.{5000}</p>
		<div className="min-w-full"> 
		<UserCard/>
		</div>
		<div className="w-full ml-7">
			<Contacts />
		</div>
		
	</section>
	)

}
