<<<<<<< HEAD
import { BaseService } from "@/services/utils/BaseService";
import { CommonOptions } from "@/services/utils/options";

export interface HealthCheckResponse {
    code: number;
    message: string;
    data: { [key: string]: any };
}

export class HealthService extends BaseService {
    /**
     * Checks the health status of the api.
     *
     * @throws {ClientResponseError}
     */
    async check(options?: CommonOptions): Promise<HealthCheckResponse> {
        options = Object.assign(
            {
                method: "GET",
            },
            options,
        );

        return this.client.send("/api/health", options);
    }
}
=======
import { BaseService } from "@/services/utils/BaseService";
import { CommonOptions } from "@/services/utils/options";

export interface HealthCheckResponse {
    code: number;
    message: string;
    data: { [key: string]: any };
}

export class HealthService extends BaseService {
    /**
     * Checks the health status of the api.
     *
     * @throws {ClientResponseError}
     */
    async check(options?: CommonOptions): Promise<HealthCheckResponse> {
        options = Object.assign(
            {
                method: "GET",
            },
            options,
        );

        return this.client.send("/api/health", options);
    }
}
>>>>>>> b42af259643220bd271331e1a014cc3443e2b760
