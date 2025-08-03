import { useEffect } from "react";
import { useState } from "react";
import { GetUser } from "../services/user";
import { GetProjectsByUser } from "../services/projects";
import Spinner from "../components/Spinner";

function Profile(){

    const [user, setUser] = useState(null);
    const [projects, setProjects] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUser  = async() => {
            try {
                const res = await GetUser();
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.error({message: error.message});
                setLoading(false);
            }
        }
        fetchUser();
    }, []);

    useEffect(() => {
        const fetchProjects = async() => {
            try {
                const res = await GetProjectsByUser();
                setProjects(res.data);
                setLoading(false);
            } catch (error) {
                console.error({message: error.message});
                setLoading(false);
            }
        }
        fetchProjects();
    }, []);

    if (loading) return <Spinner />

    return(
        <div className="ProfilePage">
            <div className="flex">
                <div className="profilePic p-3 m-3">
                    <img className="w-30 h-30 rounded-full" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAuwMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAADAgQFBgcBAAj/xAA7EAACAQMCAwYCCAUDBQAAAAABAgMABBEFIRIxQQYTIlFhcQeBFCMyQlKxwdEVYpGh8DNDciSCkuHx/8QAGQEAAwEBAQAAAAAAAAAAAAAAAQIDBAAF/8QAIhEAAwEAAgMBAAIDAAAAAAAAAAECEQMhEjFBBBMyIlFh/9oADAMBAAIRAxEAPwDVzyptIoJo+aE/MVE0DnNdzSRSq4ArNdFcFKxROOilikilrRAxYpYpnqGoWmm2xuL6dIYh1Y7k+QHU1lvaj4j3t4ZINHJtLfl3n+43z6fL+tUmGxGzTtU1zS9KTN/fRQnGeAnLH2Ub1VLv4p6TExFraXM46MSFz+tY9c3cs0heZ3dzzZicmm5kwT0PrWhcC+iNs2KD4sWDEC406dN9yjhsflVv0bXdM12HvdOuRIR9qM7MvuP8FfNrcQBJBOemKc6dqV1p10lzZyyQzx/ZkQ4I9K6/zy10drPpSS1Em5pUKCLYCqh2H7dQ68kdlfcMWocl6LL7eR9KuZ5V59cSiu/YywTPcJDGWY4xWfdoO1E3evHC+Bmrlq6lrdgD0rKdftys7kNvmpeflfiyfI36R5dbuVY8Tk+9Fg7Uvbt4hxA86rUrshw3OmzkscVf+KSGssuv6rFrVr3YUgZyc1nuo2vcyHnjNT6yd2DUTq0hnbkaaJaeIpNENIARTUrvT7uiTiufR/Sq6Pp9TZpDdKXQ351A1DhaWKGvKiqKJwoClikiiAVwDyiuu6RRPJIcKgLEnoBSgKhu2dw1r2U1OVTg9zwZ/wCRC/rTJdiNmQdre0NxrmoyTSN9QpIhToi/vVe4TIds5NKm3b3NEtxhl962apQFOhINOklbxAjpU1pnZiCRC0rsxHPFcjYAZHSpfT7zhUji51J8j0q+PoS+hWSpwmLO2PEaZyaDYA47oj1DGphp+PluTQXVmO1CuVoM8ZFwdnQsoksJ2jmXBTPmPWtL7Ka9LfacI9RHBfW57ubIxxHow9xVJiDowI23qQ75kKyqSvEMMBy9/wDPOs/Nyec/9J8nG47Lrf3MboRx1UtTtIpQfADk7mm51Ph+22abXWsEIQmDnzrLEPdZld77K9qNkscrLzwaiZIuBiQal7u443ZmO5qKupBg4rXBPSPuJuGmUjh+dduiWYgUAI3WtGIZISwC0PjHrRpV2oHDmu8Rj6gpJrtcblWQ2hl5UVKEnIUVKJwRaItIUUQU4rOgVB9u4DN2R1JR92MP/wCLA/pU8OVMNcezOnT219cRQpcxtEDI2MkjFMhT56aIliSNjvRYosEZ5USXMczRsBxKcEjkT6UrpVG2y0ocpIvDgGnlvnbhqLjQsM8gOtSNrdWkIAlnQH3pGiukpAG2yKexrkU1tby1mwI5Ub1BqQSLC7Z3qNtIeEBlHDiiPJmwnb8K5pFwy28TSS8WBTO3upb2G4iitZeBo2XvCu2cZH5UqWk+b+rI6a5JO29NJpCftUJZfDkGms1zvjNWiDxWFkfNNJTnNd7zbJNN5pdjVVAUNpAOPpXHAVc7UFpDx0mSQkYo5hRA5pBypvx0QoW3xQyldrGPqKktypVcPSshtCJyFHSgpyoyUTgqUQUNKItOhGLrPfioGe70xFyAqSNny3WtCFVP4kWhm0ZLsKS0D4bhG4Vts/1xRDDytMeZu/lc78Snf1pXFh8HGKdSxCCYAoA7KFJAqPQl2LfnVJ9FqzRc80bqVyy4+6Ad6FZ8MsixjSnAb/ckJAz74qSsLP6WwVlH5VK/wmeAnu5io9KV1g/jpDXlr/Drsonds2MiSJiyH54qxaNqEl1GikYA55NR1zZSMh42eRvLpUjotoViI4W4l3ORU6lUh5eAda1e9lmS202AEZwXcDJHmM1M6ENXinhMsifRioEgl4QxbrwgdKYz6a30gFE+1vnyNPLTvoSrM5PDyGdqm2ksA15JlGcd0pTqpIqOlYl+dS3aJPomr3UQ+zx8a+zb/rUIXyxrVHS08ZzlM68hA502aUnnRZEzvTeRcVRMCQgnnR7SNXG4ptiiQzdyd6S2VQa4QRnG1NC65ok8venipsa5PoGH1DXOortc61lNoVOVFWhLyoq0TgyUZaClFBp9wR+xYpE8Uc8TxTIHjcFWUjYg10Gu0PIBlvbfsi+mQPf2dyDacSgxOCXBO2A3lWdo3BH54ati+K+qCw0C2tyoJvLtYskfZwrPn+qgfOsamZUuJYuhORVYeopL0ktM1Lu5lwKs38Vi+jcTOB0qkrFsrjb2p9cCSPuG427pkHDgDY53+dLU6zTNdEv/ABBY7jv5UaSLop2qRsO0FrNJ3VuhjV+Yxmou3tpLtfo7RXROTt3R6CpGx7PKrq1vHNEWGM92d88t6nWIpJYJLixhaNZrle9I4u7Xc/PyzTawmSfUGt+NSR4sHovn7UjUNO0zQbaCTU4pprmXiESIDxSEDqeQ5jc1B3XfWmnajq0kSwytbG1hjjJOGfoM88DJzU1KYlVibKjrurfxTVLi8XHdyN9Xj8I2H9qj45PFQyOHbGDjcUkHBrWvWHlNa9H5YEU3kxmhhy1dYHnvQ8u8AoBscUF2zRHBNIEbEUL6GEhsChl96IwwMdaCRvSeQcPqek9RSqT1FTRpDJRkoK0ZaIGGWvO3DvXlpEqkil5G1PQrFRycfKjdKbW0ZXnStQvIrDT57y4IEUKF2Pt0+fKk4fKlrAZL8dr2V5tPtBskH123UtkZ/t/esze8+kRhv91OfqPOpztFqN3rN/eXF4/G0rngXPJeij2FVGVWifIJH4WAr0ZjxnATRYdPvkePgkPi2qcsJ1dTC+COYzyqhpOQ2fsnr5GpXStTImCPk/zZpKk0RyL6aVoWpSWZRbe5aIAj6pt1J35ZGx3NXay1mdIfFFxnA34R09qymCVjiSIjOKsOm6ndkoqFVUDJ4Vzn+tZbTXaNKUP+xaNStZr65N9qL8O3DDH92NeZ/Lc+lVe+eTVUYpEUs49rdTzcdWPvUtqGoSXNoyyMRxDuk36sQD/bNPLXTZCqqwA9MVCr8TJ+m/UIyjVtGnWZmhjZh6dKiWtpU2eJgfUYrf4tEgjQs0YZj1xVd7R9n452BiiUHPPFMv0P0ZcaMgWPx4AqctrQGJMpz86t9p2JUTB2wfMYp5qOiC2tG7sBsDljlR/m7GRnV1YcMpAXn5Um2sWkkWLhwxO1XnQtNEuHmQMSeZFTc/ZmLjW4jjAYCu5OXXgEZjq3Z+e1txMPEpOD6VCC1f8ADWndoHjj0+SB8cQqmLGhGeKm428OTPoCkZ8QpdI+8KZGgOlGWgrR1opAYVaURmkrXZZo4IXlmdY40GWZjgAUznUIz0ssVrbvPO6xxIMu7HAUVj3brtTdayXS24o7OLeOHkZMfeb8wOmKkO2Pah9Xk+j24KWKt4V6ykdT6eQrO9SvDLA3dsMZAJHqcYFauHh+slVd4AmK3EAlgP8AMMHrTCZ454wSvCzbsDyY+nkaXMxtWZo1xHIMun4ehI/zrTaRQ0nFEwaKXdk6f8h61dnIZzxEE8Jyo/t6GhoSpBBxinbwyrz8TL588elDESSg8Byw5gDBHy/aptDokLDWJ4l4Qc4qx2PaI29tl8gn7Jxzqiujx8jkfiFdSaQ+F3YqeQLHb28qm5T6KLkpFt1vtTdNHDLHJ3TRuHiA58XnWofDXtS/ajSHa7jVb22YJIVGAwPJgOnXasCuraUQicM8kIYKzEZ4CeQJqY7F9qr/ALLXrT2QV0fAlhflIAeXp13qPLwzc4hKbb1n09krHuOlQly5e5VcHBNWCwuIdR0+3u4R9XPGrqM8gRTa5shG/GF67YrC+FoOaMVjMQLN1qHvH70SRHrVmNtnnTK5sEUMxA39KClrs5yxjpWliCNGA8POnWpXMdtAzMQABsKc2Q44+FQSFrPfibdTwxERu6DkQDijxra7E9FZ1aZtU1p0iY8A54qYj7PfVrseVMOwOk3V/J36plTzZutapHpsioFKjar8tNPEc4b9D8Un7wrwNJJ8Q96JcdLRloK0R5Y4InlndUjQcTMxwAB50yAwk88VrA89wwjijGWc8gKy/tV2ml1eUxJmKyQkrGTgv6t+1K7YdqBqriC1JSxiOc9ZD+Ijy8hVLvJZGbjIIVSCFPM+/wC1auLj3tkLvvAWrXTiEPwnhdwnPBYfoKirrIt3j8gpHqOlH1ud55ETJwOEgeppOo4LknY8OD8xv/nrW30iKBXUfHbiVMlkHFj06ioqe3wgkt28J3KA8vUftUzYzBogvpTSaE28/Co8Dbp7+VTopLGdtcvJs65ZetBnDxSiVFVlPNQd/fzo93bDAZRjO2x/tTMlmiVVYvjfBHiFTelEFuXBZJEPErjn1Fc7pWwynBxnI+90xj3ptku5OBjbJFWLs5bd5dNcuvgtV7zONi/JR+uPQ0r/ANhla8RF63IbVF0xGbhibvLj+aXy/wC0bdN81HW78MqseXXFO9TtzHdybHLAuM9fOmCeLAHXpSZgaWPD6A+A+s9/ot3o0shZ7OTvIh5RP0+TA/1rUGAYEedfNHYS/utFcalaf68swVR0aNR4s+m+K+kNNvItQsLe8gOY541kX5jNTqcBvYbul8qFcwrJGwxvinFJcgKc+VSpLApgbKBYYAqgDO59TWZfG60ZLW2u49gx4JP3rUkYcAxis5+M1zG2gGHI4uNT880ZSWAfslvhvaQpocDoowUGKuOAOgrJ/grrvexzaVMw4ohmPJ5itZotZT0LZBikMd6UKBOxUE9OtTHHQu4I4WkmkWNIxlmY4AFZl2u7XPq07QWvHHZxN4Adu8P4j+gpv2z7QNdXLWMDfURH6wj7zDp7Cqi8xZwetaeLj+snVfB+txxt3pYrwnf8I/ag3TmTx4I/FnmAabW7OHkUHmKRNK1sqs6nus4JH3M9fataeIzudZyWNhOjuPuj+o2ppfOWbAGWO5PpUoWd0wVGTzxuPc/oKby2fDAxTxdSep967yGwYQScDgjkaeyqLiLB+R8qElp30XHEckdBXrV+aPsyncGu3RgLRmaJ0YeLkf5T51ClmSUONpI239as0yEAzJvwjDjzXz9xVb1VQlzxpyfekoKFFhLOzJzZs4q92NiLDTorZjiRvrZT/MeQ+Q/Wqx2TtFmuWvZlDQW3CcH7zn7I9up9B61bgzSsWfdjuSedTp6a/wA0b2VrtJDwqlwq5MTZOOo61V76M29w3D9k+Ja0TUYFuLSSNhkFSKpE8BuLAhv9W2JRvaua1A55ytLtc2y6bItsyHgjiRVwOS4/+n51svw9lV+ylqQcqnEoPpmsM0fUxrEaI7f9XGiiRM/bUY8Q/Wta+H2qW9to93Z8ZPdSZQ+YPl881G8wzpv0XOO8dp+Dg8I5HPOm+rTzIgEWMEHizTSx1S3J+tbBGedN9S1q2LFM+HGOKs7eoeZz2S1qHkt0PmOdZ78WtOd9PebvSRHhiKt9nr9gIgpuFGB51QviV2hiu4RZ2p4w5HG3TFPC/wAlgij6QnYPsveTSx6oly9rwnwFebf+q1hJ9cRQvFC2OpB3qu9mdX0+00a1WSQBlXBXFWEdqNIx4roA+WKNtuii8Ug45VFdoZ3ttJvJ4scccLsuehAr1epUFmKTMxZssScDJPWmxYjcV6vVvj0Rr2GikbvfdacTAMviUHwnnXq9VCf0FbqE4VX7IXhA9t6ewAMpBGQa7XqT4N9GEDGGd0jOBml6gi8EcwGHJwSOter1cgnbHxSkHlVY1eNYp7iNc8Mb4XPQV6vVzOLJoqCHR9NWPIEySzSercXD+SipyPZgPUflXa9Uvhr/ADe2emAyR0qoFQmu3USjwOmWHyr1eppH/T6Iks1tcrNA7RyRP4GXpWudmHxaxTKAplhDMqjAHhB2+bGu16pWYyblnkXkaZ3ErshJ516vVFJadrIku2Tuah9VQNJk7nIrteq6XZyOd+6WygHlSFmcjJNcr1NiOP/Z"></img>
                    <p>{user?.username}, {user?.role}</p>
                    <p>{user?.location}</p>
                </div>
                <img className="h-50 w-full" src="./topbarImage.jpg" alt="" />
            </div>
            <h2 className="text-center text-3xl text-amber-600">Bio</h2>
            <div className="mt-3 p-3 bg-[#fff]">
                {user?.bio}
            </div>
            <h2 className="text-center text-3xl text-amber-600 m-3">Skills</h2>
            <div className="m-6 flex justify-between text-center bg-white p-5 rounded-2xl">
                {user?.skills.map(skill => (
                    <div className="bg-gray-400 rounded-2xl p-4" key={skill?._id}>
                        {skill?.name}
                    </div>
                ))}
            </div>
            <h2 className="text-center text-3xl text-amber-600 mt-3">Projects</h2>
            <div className="grid grid-cols-3 rounded-2xl text-center bg-white m-6">
                {projects?.map(project => (
                    <div className="flex flex-col rounded-2xl items-center m-6 bg-[#6F8F63]" key={project?._id}>
                        <h2>{project?.title}</h2>
                        <div>
                            {/* <img>{project?.imageUrl}</img> */}
                            <p>{project?.description}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="text-center mb-3">
                <h2 className="text-3xl text-amber-600">Activity</h2>
                <p>Recent Activity will be shown here.</p>
            </div>
        </div>
    )
}

export default Profile;