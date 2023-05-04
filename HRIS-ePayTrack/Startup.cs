using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(HRIS_ePayTrack.Startup))]
namespace HRIS_ePayTrack
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
