import { Moderator } from "@/app/(client)/(pages)/moderators/(table)/columns"

export async function getModerators(): Promise<Moderator[]> {

    const data = [
        {
            name: "Billie Rutherford",
            email: "Madisen96@hotmail.com",
            designation: "Senior Research Planner",
            empId: "1"
        },

        {
            name: "Gilbert Schaefer",
            email: "Columbus91@yahoo.com",
            designation: "Dynamic Metrics Supervisor",
            empId: "2"
        },
        {
            name: "Trevor Mayer",
            email: "Mayra.Leannon88@gmail.com",
            designation: "Future Applications Representative",
            empId: "3"
        },
        {
            name: "Juan Toy",
            email: "Xzavier_Nikolaus@gmail.com",
            designation: "Principal Solutions Agent",
            empId: "4"
        },
        {
            name: "Gilbert Schuster",
            email: "Lottie.OHara@yahoo.com",
            designation: "Product Quality Coordinator",
            empId: "5"
        },
        {
            name: "Elijah Brekke",
            email: "Keith48@yahoo.com",
            designation: "Lead Accounts Assistant",
            empId: "6"
        },
        {
            name: "Gloria McDermott",
            email: "Johann_McGlynn3@hotmail.com",
            designation: "Investor Intranet Associate",
            empId: "7"
        },
        {
            name: "Blake Kshlerin",
            email: "Alfreda_Goyette@hotmail.com",
            designation: "Central Interactions Administrator",
            empId: "8"
        },
        {
            name: "Luke Hilll",
            email: "Alessandro83@gmail.com",
            designation: "Legacy Mobility Liaison",
            empId: "9"
        },
        {
            name: "Ms. Meghan Olson",
            email: "Chasity19@gmail.com",
            designation: "District Functionality Consultant",
            empId: "10"
        },
        {
            name: "Maurice Doyle",
            email: "Reynold.Kerluke64@gmail.com",
            designation: "Human Implementation Director",
            empId: "11"
        },
        {
            name: "Angel Ratke",
            email: "Marilou94@gmail.com",
            designation: "Customer Creative Designer",
            empId: "12"
        },
        {
            name: "Guadalupe Sporer",
            email: "Thelma9@yahoo.com",
            designation: "Lead Interactions Facilitator",
            empId: "13"
        },
    ]

    return data
}