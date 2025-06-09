using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Core.Entities.Identity
{
    public class Address
    {
        public int Id { get; set; }
        public string FName { set; get; }
        public string LName { set; get; }
        public string Street { set; get; }
        public string City { set; get; }
        public string Country { set; get; }
        public string AppUserId { set; get; }
        [JsonIgnore]
        public AppUser User { set; get; }
    }
}
