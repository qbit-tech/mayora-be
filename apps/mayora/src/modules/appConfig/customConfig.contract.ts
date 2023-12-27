import { IsNotEmpty } from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export abstract class CustomConfigApiContract {
    abstract findByKey(key?: string): Promise<CustomConfigResponse>

    abstract update(
        params: CustomConfigUpdateRequest
    ): Promise<CustomConfigUpdateResponse>
}

export class CustomConfigResponse {
    readonly content: string;
}

export class CustomConfigUpdateRequest {
    @IsNotEmpty()
    @ApiProperty()
    readonly content: string;
}

export class CustomConfigUpdateResponse extends CustomConfigResponse {
}