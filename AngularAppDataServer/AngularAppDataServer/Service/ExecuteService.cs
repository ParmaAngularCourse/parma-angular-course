using AngularAppDataServer.Models;
using System;
using System.Threading.Tasks;

namespace AngularAppDataServer.Service
{
    public class ExecuteService
    {
        public async Task<ServiceResponse<T>> TryExecute<T>(Func<Task<T>> executeFunc)
        {
            T result;
            try
            {
                result = await executeFunc().ConfigureAwait(false);
            }
            catch(Exception ex)
            {
                return new ServiceResponse<T>
                {
                    IsSuccess = false,
                    ErrorText = ex.Message,
                    Data = default(T)
                };
            }

            return new ServiceResponse<T>
            {
                IsSuccess = true,
                ErrorText = "",
                Data = result
            };
        }

        public async Task<ServiceResponse<object>> TryExecute(Func<Task> executeFunc)
        {            
            try
            {
                await executeFunc().ConfigureAwait(false);
            }
            catch (Exception ex)
            {
                return new ServiceResponse<object>
                {
                    IsSuccess = false,
                    ErrorText = ex.Message,
                    Data = null
                };
            }

            return new ServiceResponse<object>
            {
                IsSuccess = true,
                ErrorText = "",
                Data = null
            };
        }
    }
}
