export default function Footer() {
  return (
    <footer className="bg-green-400 text-white py-8 px-1.5">
      <div>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAMAAABC4vDmAAAAaVBMVEX///8AAAACAgLv7+8pKSmDg4M3Nzf8/PxNTU319fXy8vJISEjc3Ny2trb4+PjT09OmpqY8PDyUlJS+vr5cXFyfn5/o6OjHx8d1dXXNzc1jY2NCQkJSUlJ7e3uMjIwZGRlra2sgICANDQ3RPErcAAAD9klEQVR4nO2a27aqIBSGI03zlAcUT6nV+z/kBgTEdq1deyyUi/ldFKnVPyYw5w96OAAAAAAAAAAAAAAAAAAAAAD2E+OsqpJ0TwldH0V5oT4G+HxHjCnKAnU0vEYz3ZCQDUR5TMFJfopLruh4ZK85loedWehMcdlAFFUgRSVckIC2KynKFTr523VTUVgFaRZHo7KIUocRSjYUFQsl52Y8nae5jRdRZ+fi1Gd2eeNvJ6rkYfAwGzOX9MpV5eEiKhDCURluJgqz/0OljII/8s/VWtSBiwre/NjvixpYy3WWUyxWyFuL4pEaDGtaRIVsFCGsnUofVMAjVaJISOqcRS/eTBRhjYfeMX6JxFTjoqbrtUdoi8m3iKpZo1vNq5McVFqeQp7z+oeMiMJ8sq/OFUikqkUUrT9lvZ2oljXKVaQGPVJUTVfyorRh8iSsb34aUzR5BqRiV+Wme1CJCngXZdqpmsuMD6s8dXueoyZwVZ468WGsOZOIncoPa1EZO1i8+qXfw+cldmRNlpaOqJeqgtsy/zVRo7rejB72kvAKN4/cG297GTvhtznXFGm1j9VEgp47+XepBlwXPDoiRVMrN9uorrlNwqXMrpiL8rIkGY/a9SZIlD+SBbbmfkW6OdYQIdHyFHsfzFmXVv11qw65mvXUEhIXdUTC6ZUG7VQqPJ0yvRTSKdNJba9a0TiTcuiTm5j06PH8L916MdUOc9aeGi1vh+OJMxaZ4aWXT2qMW8L7Ilx6xA/jFtepo/XRBiX4FelPAYjbH04axNHtwSV0HC10h9G4qXuDGlkhLm6960ZNJaWEvel1wjsKGapkWQmLI1Xz7kumiZGoef4RiSwlYhe45orKP7hMczx85oG5qE6ko+yx15BiLpOGKi6IyqnZIazotPNzbzdN1KKPcdnTLvOHucDRY07vpYme8Lcm9O7CS7WLO6Ge6o622JB6R6H2LTzNgRbmdzN+wlGbYXS5jq6ytGTmF1Qf0SPNFdsCNaDovl8eeAlfAKKdivA7eKLaYBfjKzKk781aQsFFRXvLWOE3c5nZW8eKcN6BRXuZqJcQsSTd9ebMM4tLsAgsVqjmNjH+g0KYvF0L8TOdEHXdabX3krsQ5VpU/YLpaeFgAymSokxvbH5BIveCTG9sfkOhRJV7S1HMle9oV/Vz+kWUNY6YoEWUJUsGsegToqwZ6Zn2CIA15nPURFlT/W6aqM70/etP6TRRxu/0f0qjR8r8Qy2foQ9043f6PyXVUoI1hpiWGVn7HrZMPt267LiD9xciU5l/oOUbSG/huo8/HWRRjRHcEEJnm9YyDOJt8ODP19RWzTxJbU+KAgAAAAAAAAAAAAAAAAAAAP7JH7vEJ0cSDQ8ZAAAAAElFTkSuQmCC"
          alt="Job Shazam Logo"
          className="w-16 mb-4 align-middle"
        />
      </div>
      <div className="flex justify-between items-center text-white m-6 mx-auto gap-x-1.5">
        <div className="flex gap-1">
          <a href="">About us</a>
          <a href="">Services</a>
          <a href="">Jobs</a>
          <a href="">reviews</a>
        </div>
        <div>
            <p>© 2025 Job Shazam. All rights reserved.</p>
            <p>Privacy Policy | Terms of Service</p>
        </div>
      </div>
    </footer>
  );
}
