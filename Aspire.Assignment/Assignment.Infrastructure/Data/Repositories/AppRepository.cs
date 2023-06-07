﻿using Assignment.Contracts.Data.Entities;
using Assignment.Contracts.Data.Repositories;
using Assignment.Migrations;

namespace Assignment.Core.Data.Repositories
{
    public class AppRepository : Repository<App>, IAppRepository
    {
        public AppRepository(AssignmentTaskDBContext context) : base(context)
        {
        }
    }
}