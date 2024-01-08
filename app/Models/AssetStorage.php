<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\SoftDeletes;

class AssetStorage extends Model
{
    use HasFactory,SoftDeletes;

    protected $fillable = [
        'storage_type',
        'storage_capacity',
        'asset_id',
    ];

    /**
     * Get the asset that owns the AssetStorage
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function device(): BelongsTo
    {
        return $this->belongsTo(Device::class);
    }

}
